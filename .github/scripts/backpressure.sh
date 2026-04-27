#!/usr/bin/env bash

# ==============================================================================
# BACKPRESSURE GENERATOR: Generate tests based on current PRD
# Usage: ./backpressure.sh
# ==============================================================================

set -euo pipefail

source .github/scripts/agents/prompt.sh
source .github/scripts/helpers/log.sh

# Main

LEDGER=$(tail -n 5 .agent-ledger.jsonl || echo "No history.")
PRD=$(cat PRD.md)

log INFO "Starting to generate backpressure..."

AGENT_PROMPT="
You are a TEST AUTHOR. You write ONLY test files and validation scripts. You do NOT implement application code.

Your job: for each unchecked task in the PRD below, write a test or validation script that will FAIL until that task is correctly implemented by a future agent.

Read package.json before generating tests to understand which dependencies and test runners are available.
If your tests require packages not present in devDependencies (e.g., jest-environment-jsdom for React component tests), install them first with \`npm install -D <package>\`. If your tests require a different Jest environment or setup, update jest.config.mjs before writing the test files.

You are running in non-interactive mode, if you have a question, pick the solution which does not break an existing constraint.

- DO NOT create or modify application source files (src/, app/, pages/, components/, lib/, styles/).
- DO NOT modify ANY of these guarded files: jest.config.mjs, tsconfig.json, next.config.mjs, postcss.config.mjs, biome.json, tailwind.config.*, .env*. The orchestrator hard-denies these edits and aborts the whole run if they are mutated. If your tests genuinely require a config change, STOP and report that the blueprint is missing a foundation task — do NOT attempt the change yourself.
- You MAY install devDependencies needed for your tests using \`npm install -D <package>\`. Only install test-related packages (e.g., jest-environment-jsdom, @testing-library/jest-dom, @testing-library/react). Do NOT install application dependencies.
- Before writing tests, read the full PRD and the existing jest.config.mjs / tsconfig.json. The blueprint is responsible for designing path aliases, moduleNameMapper, testEnvironment, and setupFilesAfterEnv. Your job is to write tests that work WITH whatever config is already in place. If the foundation ticket clearly missed something needed (e.g., the implementation will use \`@/foo\` aliases but jest has no \`moduleNameMapper\`), still write your tests assuming the config will work, and add one short note to MEMORY.md describing the gap.
- DO NOT implement any task. If a task says \"Install X\" or \"Create config Y\", write a test that asserts X is installed or Y exists — do not perform the action itself.
- Only write test files (.test.ts, .spec.ts) and validation scripts (tests/scripts/*.sh).
- Treat each checkbox item as a single atomic unit of work.
  - Every task MUST include a \`[test: command]\` annotation. If a task is missing its annotation, STOP and report the error — do NOT infer or guess what test to write.
  - Handle the \`[test: command]\` annotation as follows:
    - If the command references a specific test file (e.g., \`[test: npx jest tests/unit/foo.test.ts]\`), create that exact file with the appropriate test content.
    - If the command is a run-only command with NO file path (e.g., \`[test: npm run lint]\`, \`[test: npm run check-types]\`, \`[test: npx tsc --noEmit]\`, \`[test: npx biome check]\`), do NOT create any test file or validation script. The command itself IS the validation — it will pass or fail based on whether the implementation is correct. Skip this task entirely.
  - The generated test file MUST match the exact path in the annotation (e.g., \`[test: npx jest tests/unit/create-basepath-helpers.test.ts]\` → create \`tests/unit/create-basepath-helpers.test.ts\`).
  - The test runner specified in the annotation determines the test framework and file type:
    - \`npx jest tests/unit/foo.test.ts\` → Jest unit test
    - \`bash tests/scripts/foo.sh\` → shell validation script
  - Shell validation scripts MUST source the shared helper library (tests/helpers/assert.sh) and use its functions:
    - Begin with: \`source \"\$(cd \"\$(dirname \"\$0\")\" && pwd)/../helpers/assert.sh\"\`
    - End with: \`report_results\`
    - Available helpers:
      - \`assert \"desc\" command [args...]\` — run any command, pass if exit 0
      - \`assert_grep \"desc\" \"pattern\" \"filepath\"\` — fixed-string grep in file
      - \`assert_grep_regex \"desc\" \"pattern\" \"filepath\"\` — regex grep in file
      - \`assert_json \"desc\" \"js_expression\" \"filepath\"\` — JSON query via node; object is bound to \`_\`
        Example: \`assert_json \"has react\" \"_.dependencies.react\" \"./package.json\"\`
    - If none of the provided helpers fit your assertion, you MAY define a local helper in the script. Local helpers MUST record results by calling \`_pass \"desc\"\` and \`_fail \"desc\"\` (provided by the library). Do NOT manipulate PASS/FAIL counters directly or use \`((var++))\`.
    - Do NOT redefine PASS, FAIL, \`_pass\`, \`_fail\`, or \`report_results\`
- The test file's own extension is chosen by the runner and the subject's language:
    - TypeScript subject (.ts, .tsx) → .test.ts / .spec.ts
    - JavaScript subject (.js, .jsx, .mjs, .cjs) → .test.js / .spec.js
- Use imports without file extensions (e.g., import { foo } from './bar' not './bar.js') when possible. Do not use extensions if the import can be resolved without them.
- Use ONLY data-testid attributes as element selectors. Do not assume class names, routing paths, or component structure beyond what the PRD states.
- React DOM treats \`<html>\`, \`<body>\`, and \`<head>\` as singleton elements — they merge with the real document instead of rendering inside the test container. When testing components that render these elements, query them via \`document.documentElement\`, \`document.body\`, or \`document.head\` directly. Do not use \`container.querySelector()\` or \`screen.getByTestId()\` for document-level elements.
- Assert on: visibility, text content, ARIA roles, and keyboard focus where relevant to the task.
- Tests should fail against a blank implementation — avoid trivially passing assertions (e.g. no expect(true).toBe(true)).
- Sanity tests must contain the minimum assertion described — do not expand them.
- Each test file must cover the following:
    - The primary happy path
    - The most likely failure or edge case
- All generated tests must FAIL if the task is not complete, such as having zero implementation code.
- Use a beforeEach block for any shared setup (navigation, auth state).

When finished, run the following quality gates in order:
- \`npm run lint\` — auto-fixes lint & formatting issues. Manually resolve any issues that cannot be auto-fixed.
- \`npm run check-types\` — verifies TypeScript compilation. Fix any type errors before finishing.

Then, for each test file you created, run it individually (e.g., \`npx jest tests/unit/foo.test.tsx\`) and inspect the output:
  1. The test runner must LOAD the file successfully — no \`ReferenceError\`, \`SyntaxError\`, or \`Cannot find module\` for test-side dependencies (e.g., \`react\`, \`@testing-library/*\`, mock setup files).
  2. The tests must FAIL with either assertion errors or missing-module errors for the *implementation* files that don't exist yet. This is expected backpressure.
  3. For each failing assertion, verify it CAN pass once a correct implementation exists: trace what the rendered DOM or output would look like and confirm your queries target elements that will actually be present and findable. If an assertion would still fail against a correct implementation, fix the test.
  If any test fails due to a broken import, missing test dependency, or runtime error in the test file itself, fix it before finishing.

--- ARCHITECTURAL HISTORY (Last 5 Entries) ---

$LEDGER

--- PRD ---

$PRD
"

# Snapshot files we want to guard against unintended mutation by the backpressure agent.
# These are files whose semantics belong to the foundation/blueprint, not to a tests-only
# author. If the agent must change them, the change should originate in the blueprint.
GUARDED_FILES=(
    "jest.config.mjs"
    "tsconfig.json"
    "next.config.mjs"
    "postcss.config.mjs"
    "biome.json"
)

declare -A GUARDED_HASHES=()
for f in "${GUARDED_FILES[@]}"; do
    if [[ -f "$f" ]]; then
        GUARDED_HASHES[$f]=$(shasum "$f" | awk '{print $1}')
    else
        GUARDED_HASHES[$f]=""
    fi
done

prompt "$AGENT_PROMPT" --cli claude \
    --allowedTools "Read,Write,Edit,Glob,Grep,Bash(npm run lint),Bash(npm run check-types),Bash(npm test),Bash(npx jest:*),Bash(npx tsc:*),Bash(npx biome:*),Bash(npm install -D *),Bash(bash tests/scripts/*)" \
    --disallowedTools "Edit(jest.config.mjs),Write(jest.config.mjs),Edit(tsconfig.json),Write(tsconfig.json),Edit(next.config.mjs),Write(next.config.mjs),Edit(postcss.config.mjs),Write(postcss.config.mjs),Edit(biome.json),Write(biome.json),Bash(rm *),Bash(git:*)" \
    --model "${SENIOR_DEVELOPER_MODEL:-claude-opus-4-6}"

# Post-mutation audit: if any guarded file changed despite the deny rules, warn loudly.
# (Belt-and-braces: deny rules can be bypassed by some Bash calls; this catches drift.)
for f in "${GUARDED_FILES[@]}"; do
    expected="${GUARDED_HASHES[$f]}"
    actual=""
    [[ -f "$f" ]] && actual=$(shasum "$f" | awk '{print $1}')
    if [[ "$expected" != "$actual" ]]; then
        log ERROR "Backpressure agent mutated guarded file: $f (was '${expected:-absent}', now '${actual:-absent}')."
        log ERROR "Guarded files must be designed up front in the blueprint, not added during backpressure. Aborting."
        exit 1
    fi
done

log INFO "Backpressure prompt completed."
