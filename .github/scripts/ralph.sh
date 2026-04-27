#!/usr/bin/env bash

# ==============================================================================
# RALPH LOOP: The test-gated, autonomous AI development cycle
# Usage: ./ralph.sh <ARCHIVE_FOLDER>
# ==============================================================================

set -euo pipefail

source .github/scripts/helpers/log.sh
source .github/scripts/agents/prompt.sh
source .github/scripts/helpers/isolator.sh

# Settings

LOCK_FILE=".ralph.lock"
MAX_LOOPS=10 # This is the maximum number of iterations per task
TYPE_CHECK_CMD="npm run check-types"
UNIT_TEST_CMD="npx jest --silent --no-verbose"

# Main

if [ -e "$LOCK_FILE" ]; then
    log ERROR "Ralph Loop is already running! Exiting..."
    exit 1
fi

touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE && restore_backpressure" EXIT
trap 'exit 130' INT HUP TERM

if [[ -z "${1:-}" ]]; then
    log ERROR "ARCHIVE_FOLDER argument is required."
    log ERROR "Usage: $0 <ARCHIVE_FOLDER>"
    exit 1
fi
ARCHIVE_FOLDER="$1"
shift

if [ ! -f PRD.md ]; then
    log ERROR "PRD.md not found."
    exit 1
fi

log WARN "Starting Ralph Loop for at most $MAX_LOOPS iterations..."

ERROR_FEEDBACK=""
LOOP_COUNTER=0
TOTAL_LOOPS=0
PREVIOUS_TASK_VALIDATION=()
declare -A PREVIOUS_TASK_VALIDATION_LOOKUP

isolate_backpressure

while true; do
    log INFO "Parsing Active Task & Target Test..."

    CURRENT_TASK=$(grep -m 1 "^\s*- \[ \]" PRD.md || true)
    export CURRENT_TASK

    if [ -z "$CURRENT_TASK" ]; then
        log SUCCESS "🎉 No incomplete tasks found in PRD.md. Cleaning up..."

        rm -rf MEMORY.md
        mkdir -p "$ARCHIVE_FOLDER"

        PRD_TITLE=$(head -1 PRD.md | sed -E 's/^#+ (PRD: )?//')
        PRD_FILENAME=$(echo "$PRD_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed -E 's/-+/-/g' | sed -E 's/^-|-$//g')

        ARCHIVE_PATH="$ARCHIVE_FOLDER/PRD.$PRD_FILENAME.md"

        COUNTER=1
        while [[ -f $ARCHIVE_PATH ]]; do
            ARCHIVE_PATH="$ARCHIVE_FOLDER/PRD.$PRD_FILENAME.$COUNTER.md"
            ((COUNTER++))
        done

        log INFO "Archiving PRD to $ARCHIVE_PATH..."
        mv PRD.md "$ARCHIVE_PATH"

        git add .
        git commit -m "chore(ai): Archived PRD & Cleanup"
        break
    fi

    if [[ "$LOOP_COUNTER" -ge "$MAX_LOOPS" ]]; then
        log WARN "⚠️ Max loops reached for task. Escalating to repair agent before aborting..."

        REPAIR_PROMPT_BODY=$(cat .github/prompts/repair.md 2>/dev/null || echo "")
        if [[ -z "$REPAIR_PROMPT_BODY" ]]; then
            log ERROR "Repair prompt missing at .github/prompts/repair.md. Aborting."
            exit 1
        fi

        REPAIR_TARGETED_TEST=$(echo "$CURRENT_TASK" | sed -n 's/.*`\[test: \(.*\)\]`.*/\1/p')
        REPAIR_TEST_FILE=""
        if [[ -s PRD.md.tests.tsv && -n "$CURRENT_TASK" ]]; then
            _repair_hash=$(printf '%s' "$CURRENT_TASK" | shasum | awk '{print $1}')
            REPAIR_TEST_FILE=$(awk -v h="$_repair_hash" -F'\t' '$1==h {print $2; exit}' PRD.md.tests.tsv)
        fi
        REPAIR_TEST_CONTENTS=""
        if [[ -n "$REPAIR_TEST_FILE" && -f "$REPAIR_TEST_FILE" ]]; then
            REPAIR_TEST_CONTENTS=$(cat "$REPAIR_TEST_FILE")
        fi

        REPAIR_BLUEPRINT_CONTEXT=""
        if [[ -n "${MAESTRO_BLUEPRINT_FILE:-}" && -s "${MAESTRO_BLUEPRINT_FILE}" && -n "${MAESTRO_TICKET_NUM:-}" ]]; then
            REPAIR_BLUEPRINT_CONTEXT=$(awk -v num="${MAESTRO_TICKET_NUM}" '
                BEGIN { found = 0 }
                /^#### Ticket [0-9]+/ {
                    if (found) exit
                    tmp = $0; sub(/^#### Ticket /, "", tmp)
                    if ((tmp + 0) == num) { found = 1 }
                }
                found { print }
            ' "${MAESTRO_BLUEPRINT_FILE}")
        fi

        REPAIR_PROMPT="
$REPAIR_PROMPT_BODY

--- ACTIVE PRD TASK (the loop is stuck here) ---

$CURRENT_TASK

--- LAST FAILING VALIDATION ---

Command: $REPAIR_TARGETED_TEST

Output:
$TEST_OUTPUT

--- FAILING TEST FILE (${REPAIR_TEST_FILE:-unresolved}) ---

$REPAIR_TEST_CONTENTS

--- LAST 5 LEDGER ENTRIES ---

$(tail -n 5 .agent-ledger.jsonl 2>/dev/null || echo 'No history.')

--- TICKET BLUEPRINT (design intent) ---

$REPAIR_BLUEPRINT_CONTEXT
"

        set +e
        REPAIR_OUTPUT=$(prompt "$REPAIR_PROMPT" \
            --allowedTools "Read,Edit,Write,Glob,Grep,Bash" \
            --disallowedTools "Bash(git:*),Bash(npm test*),Bash(npm run test*),Bash($TYPE_CHECK_CMD*),Bash(npx jest*),Bash(npx playwright*),Bash(npx tsc*)" \
            --model "${SENIOR_DEVELOPER_MODEL:-claude-opus-4-6}")
        REPAIR_EXIT=$?
        set -e

        if [[ $REPAIR_EXIT -ne 0 ]]; then
            log ERROR "Repair agent failed (exit $REPAIR_EXIT). Aborting."
            exit 1
        fi

        REPAIR_VERDICT=$(echo "$REPAIR_OUTPUT" | sed -n 's/.*<verdict>\(.*\)<\/verdict>.*/\1/p' | head -n1)
        REPAIR_SUMMARY=$(echo "$REPAIR_OUTPUT" | awk '/<summary>/{flag=1; sub(/.*<summary>/,""); } /<\/summary>/{sub(/<\/summary>.*/,""); print; exit} flag{print}')

        log INFO "Repair verdict: ${REPAIR_VERDICT:-(none)}"
        log INFO "Repair summary: ${REPAIR_SUMMARY:-(none)}"

        case "$REPAIR_VERDICT" in
            code-fix)
                log INFO "Repair patched code directly. Resetting loop counter and re-validating."
                LOOP_COUNTER=0
                continue
                ;;
            backpressure-bug)
                REPAIR_DIFF=$(echo "$REPAIR_OUTPUT" | awk '/<diff>/{flag=1; next} /<\/diff>/{flag=0} flag')
                if [[ -z "$REPAIR_DIFF" ]]; then
                    log ERROR "Repair declared backpressure-bug but emitted no <diff> body. Aborting."
                    exit 1
                fi
                if ! echo "$REPAIR_DIFF" | git apply --check 2>/dev/null; then
                    log ERROR "Repair diff failed git apply --check. Aborting."
                    echo "$REPAIR_DIFF" | head -40 >&2
                    exit 1
                fi
                echo "$REPAIR_DIFF" | git apply
                git add .
                git commit -m "fix(ai): Repair backpressure for stuck task" || true
                log INFO "Backpressure patched. Resetting loop counter."
                LOOP_COUNTER=0
                continue
                ;;
            abort|*)
                log ERROR "Repair declined to recover. Surfacing to human and aborting."
                log ERROR "${REPAIR_SUMMARY:-(no summary)}"
                exit 1
                ;;
        esac
    fi

    LOOP_COUNTER=$((LOOP_COUNTER+1))

    log INFO "------------------------- Iteration $((LOOP_COUNTER))/$MAX_LOOPS (Total: $((LOOP_COUNTER + $TOTAL_LOOPS))) -------------------------"
    log INFO "Active Task:
    $CURRENT_TASK"

    TARGETED_TEST=$(echo "$CURRENT_TASK" | sed -n 's/.*`\[test: \(.*\)\]`.*/\1/p')

    if [ -z "$TARGETED_TEST" ]; then
        log WARN "No targeted test found for this task. Defaulting to full suite."
        TARGETED_TEST="npm test"
    else
        log INFO "Targeted Backpressure Found: $TARGETED_TEST"
    fi

    log INFO "Assembling Context Window..."

    RALPH_PROMPT=$(cat .github/prompts/ralph.md 2>/dev/null || echo "You are an autonomous developer.")
    LEDGER_CONTEXT=$(tail -n 5 .agent-ledger.jsonl 2>/dev/null || echo "No history.")
    MEMORY_CONTEXT=$(cat MEMORY.md 2>/dev/null || echo "Scratchpad empty.")
    FULL_PRD_CONTENT=$(cat PRD.md)

    # Pull the matching ticket section out of the blueprint, if one is reachable.
    # Maestro exports MAESTRO_BLUEPRINT_FILE; the inner ralph script falls back to a no-op.
    BLUEPRINT_TICKET_CONTEXT=""
    if [[ -n "${MAESTRO_BLUEPRINT_FILE:-}" && -s "${MAESTRO_BLUEPRINT_FILE}" && -n "${MAESTRO_TICKET_NUM:-}" ]]; then
        BLUEPRINT_TICKET_CONTEXT=$(awk -v num="${MAESTRO_TICKET_NUM}" '
            BEGIN { found = 0 }
            /^#### Ticket [0-9]+/ {
                if (found) exit
                tmp = $0; sub(/^#### Ticket /, "", tmp)
                if ((tmp + 0) == num) { found = 1 }
            }
            found { print }
        ' "${MAESTRO_BLUEPRINT_FILE}")
    fi

    # Inline the current contents of any backticked file paths the task names, so the
    # JUNIOR model can correlate failures without a re-Read round-trip.
    REFERENCED_FILES_CONTEXT=""
    while IFS= read -r ref_path; do
        [[ -z "$ref_path" ]] && continue
        [[ "$ref_path" == */ ]] && continue
        [[ ! -f "$ref_path" ]] && continue
        # Cap each file at ~200 lines to keep the window bounded
        REFERENCED_FILES_CONTEXT+=$'\n=== '"$ref_path"$' ===\n'
        REFERENCED_FILES_CONTEXT+=$(head -200 "$ref_path")
        REFERENCED_FILES_CONTEXT+=$'\n'
    done < <(printf '%s\n' "$CURRENT_TASK" \
        | grep -oE '`[^`]+`' \
        | sed 's/^`//; s/`$//' \
        | grep -E '\.(ts|tsx|js|jsx|mjs|cjs|json|css|md|yml|yaml)$' \
        | sort -u)

    AGENT_PROMPT="
$RALPH_PROMPT${ERROR_FEEDBACK:+$'\n'}$ERROR_FEEDBACK

--- ARCHITECTURAL HISTORY (Last 5 Entries) ---

$LEDGER_CONTEXT

--- YOUR PREVIOUS NOTES (MEMORY.md) ---

$MEMORY_CONTEXT
${BLUEPRINT_TICKET_CONTEXT:+$'\n--- TICKET BLUEPRINT (read-only, for design intent) ---\n\n'}${BLUEPRINT_TICKET_CONTEXT}
${REFERENCED_FILES_CONTEXT:+$'\n--- CURRENT CONTENTS OF FILES NAMED IN THE TASK ---\n'}${REFERENCED_FILES_CONTEXT}

--- FULL PRD (your active task is the first unchecked checkbox) ---

$FULL_PRD_CONTENT
"

    ERROR_FEEDBACK=""

    restore_backpressure "$TARGETED_TEST" "$CURRENT_TASK"

    set +e
    OUTPUT=$(prompt "$AGENT_PROMPT" \
        --allowedTools "Read,Edit,Write,Glob,Grep,Bash" \
        --disallowedTools "Bash(git:*),Bash(npm test*),Bash(npm run test*),Bash($TYPE_CHECK_CMD*),Bash(npx jest*),Bash(npx playwright*),Bash(npx tsc*)" \
        --model "${JUNIOR_DEVELOPER_MODEL:-claude-sonnet-4-6}")
    PROMPT_EXIT=$?
    set -e

    case $PROMPT_EXIT in
        0)
            ;;  # Prompt succeeded
        2)
            log WARN "Rate limit hit. Waiting 15 minutes..."
            sleep 900
            LOOP_COUNTER=$((LOOP_COUNTER - 1))
            continue
            ;;
        *)
            log WARN "Engine failed (exit $PROMPT_EXIT). Retrying in 5s..."
            sleep 5
            continue
            ;;
    esac

    log INFO "Agent finished. Extracting proposed state updates..."
    PROPOSED_MEMORY=$(echo "$OUTPUT" | awk '/<memory>/{flag=1; next} /<\/memory>/{flag=0} flag')
    PROPOSED_LEDGER=$(echo "$OUTPUT" | awk '/<ledger>/{flag=1; next} /<\/ledger>/{flag=0} flag')

    log INFO "Determining validation commands..."
    ALLOWED_PREFIXES=("npm test" "npx jest" "npx tsc" "npx biome" "bash tests/scripts")
    ALLOWED=false
    for prefix in "${ALLOWED_PREFIXES[@]}"; do
        if [[ "$TARGETED_TEST" == "$prefix"* ]]; then
            ALLOWED=true
            break
        fi
    done

    if [[ "$ALLOWED" != "true" ]]; then
        log ERROR "Blocked test command: '$TARGETED_TEST'"
        log ERROR "   Only commands starting with: ${ALLOWED_PREFIXES[*]} are permitted."
        log ERROR "   Fix the [test: ...] annotation in PRD.md and re-run."
        exit 1
    fi

    UNCHECKED_COUNT=$(grep -c "^\s*- \[ \]" PRD.md || true)

    # Build validation set: typecheck + targeted test + every previously-passing
    # targeted test (regression guard). On the last task we also restore the
    # full backpressure suite and run lint + unit + e2e once.
    COMBINED_VALIDATION=("$TYPE_CHECK_CMD" "$TARGETED_TEST")
    PREVIOUS_TASK_VALIDATION_LOOKUP[$TYPE_CHECK_CMD]=1

    if [[ ${#PREVIOUS_TASK_VALIDATION[@]} -gt 0 ]]; then
        COMBINED_VALIDATION+=("${PREVIOUS_TASK_VALIDATION[@]}")
    fi

    if [ "$UNCHECKED_COUNT" -eq 1 ]; then
        # Last task: pull every isolated test back into place and run the full battery once.
        restore_backpressure
        COMBINED_VALIDATION+=("npm run lint")

        if [ -d tests/unit ] && ls -A tests/unit 2>/dev/null | grep -q .; then
            COMBINED_VALIDATION+=("$UNIT_TEST_CMD")
            PREVIOUS_TASK_VALIDATION_LOOKUP[$UNIT_TEST_CMD]=1
        fi

        # Note: Playwright/E2E intentionally not run inside ralph — there is no
        # next-dev server orchestrated here, so the gate would be silently
        # broken once any real spec lands. E2E belongs in CI on the deploy branch.
    fi

    # Dedupe while preserving order
    declare -A _seen=()
    DEDUPED_VALIDATION=()
    for cmd in "${COMBINED_VALIDATION[@]}"; do
        if [[ -z "${_seen[$cmd]:-}" ]]; then
            _seen[$cmd]=1
            DEDUPED_VALIDATION+=("$cmd")
        fi
    done
    COMBINED_VALIDATION=("${DEDUPED_VALIDATION[@]}")
    unset _seen

    for TEST_COMMAND in "${COMBINED_VALIDATION[@]}"; do
        log INFO "Running Validation: $TEST_COMMAND"
        set +e
        TEST_OUTPUT=$(eval "$TEST_COMMAND" 2>&1)
        TEST_EXIT_CODE=$?
        set -e
        
        if [ $TEST_EXIT_CODE -ne 0 ]; then
            break;
        fi
    done

    if [ $TEST_EXIT_CODE -eq 0 ]; then
        log SUCCESS "Task passed! Continuing..."
        CURRENT_TASK_LABEL="Iteration $((LOOP_COUNTER + 1))"

        PREVIOUS_TASK_VALIDATION+=("$TARGETED_TEST")
        PREVIOUS_TASK_VALIDATION_LOOKUP[$TARGETED_TEST]=1
        
        if [ -n "$PROPOSED_MEMORY" ]; then
            echo "$PROPOSED_MEMORY" > MEMORY.md
            log INFO "Memory Updated:\n$PROPOSED_MEMORY"
        fi

        if [ -n "$PROPOSED_LEDGER" ]; then
            PROPOSED_LEDGER=$(printf '%s' "$PROPOSED_LEDGER" | tr -d '\n')
            CURRENT_TASK_LABEL=$(printf '%s' "$PROPOSED_LEDGER" | sed -nE 's/.*"task"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/p')
            if [ -s .agent-ledger.jsonl ] && [ -n "$(tail -c1 .agent-ledger.jsonl)" ]; then
                echo >> .agent-ledger.jsonl
            fi
            echo "$PROPOSED_LEDGER" >> .agent-ledger.jsonl
            log INFO "Ledger Entry Added:\n$PROPOSED_LEDGER"
        fi

        awk '{
            if (!done && $0 == ENVIRON["CURRENT_TASK"]) {
                sub(/- \[ \]/, "- [x]")
                done = 1
            }
            print
        }' PRD.md > PRD.md.tmp && mv PRD.md.tmp PRD.md
        
        git add .
        git commit -m "feat(ai): $CURRENT_TASK_LABEL"

        TOTAL_LOOPS=$((TOTAL_LOOPS+LOOP_COUNTER))
        LOOP_COUNTER=0
    else
        log ERROR "Validation failed. The agent must try again."
        log INFO "Test Output:\n$TEST_COMMAND\n$TEST_OUTPUT"

        ERROR_FEEDBACK_HEADER="YOUR LAST ATTEMPT FAILED!
        You tried to complete the task, but the validation failed."
        REGRESSION_HINT=""
        if [[ ${PREVIOUS_TASK_VALIDATION_LOOKUP[$TEST_COMMAND]:-} ]]; then
            ERROR_FEEDBACK_HEADER="YOUR LAST ATTEMPT CAUSED A REGRESSION!
        A validation that was previously passing has just broken. The fix is almost
        certainly in code you mutated this cycle — NOT in the test, and NOT in code
        from earlier tasks unless your most recent edit touched it."
            # Try to surface the most recent ledger entry whose files_mutated
            # overlap with files referenced by the failing test command.
            if [[ -s .agent-ledger.jsonl ]]; then
                local_test_target=$(printf '%s' "$TEST_COMMAND" | awk '{print $NF}')
                if [[ -n "$local_test_target" && -f "$local_test_target" ]]; then
                    REGRESSION_HINT=$(grep -F "$local_test_target" .agent-ledger.jsonl | tail -n 1 || true)
                fi
                if [[ -z "$REGRESSION_HINT" ]]; then
                    REGRESSION_HINT=$(tail -n 1 .agent-ledger.jsonl)
                fi
            fi
        fi

        ERROR_FEEDBACK="
        $ERROR_FEEDBACK_HEADER

        Test Command: $TEST_COMMAND
        Exit Code: $TEST_EXIT_CODE
${REGRESSION_HINT:+$'\n        Most recent ledger entry that mutated this surface:\n        '}${REGRESSION_HINT}

        Test Output / Error Logs:
        $TEST_OUTPUT

        Please analyze the error, fix the code, and try again.
        "

        log WARN "Retrying in 5 seconds... (Ctrl+C to abort)"
        sleep 5
    fi

    log INFO "Looping..."
done

remove_backpressure

log INFO "👋 Ralph Loop ended after $TOTAL_LOOPS successful iteration(s)!"
