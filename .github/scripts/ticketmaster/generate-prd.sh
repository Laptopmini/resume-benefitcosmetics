#!/usr/bin/env bash

# ==============================================================================
# GENERATE-PRD: Deterministically convert a blueprint ticket into PRD.md.
# Usage: ./generate-prd.sh <blueprint-file> <ticket-number>
#
# Parses the blueprint's `[tag, slug]` or `[tag, slug, ext]` annotations to
# derive test commands without ambiguity. Emits a sidecar mapping
# `PRD.md.tests.tsv` (task-line-hash<TAB>test-file-path) consumed by
# helpers/isolator.sh for robust backpressure isolation/restoration.
#
# Task-line contract (per blueprint line):
#   N. [<tag>, <slug>] description...                # legacy; ext defaults below
#   N. [<tag>, <slug>, <ext>] description...         # explicit extension
#
# Tags:
#   infra → bash tests/scripts/<slug>.sh             (ext ignored)
#   code  → npx jest tests/unit/<slug>.test.<ext>    (ext defaults to tsx)
#
# Allowed test prefixes mirror the allow-list in ralph.sh.
# ==============================================================================

set -euo pipefail

source .github/scripts/helpers/log.sh

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <blueprint-file> <ticket-number>" >&2
    exit 1
fi

BLUEPRINT="$1"
TICKET_NUM="$2"

if [ ! -s "$BLUEPRINT" ]; then
    log ERROR "Blueprint file '$BLUEPRINT' does not exist or is empty."
    exit 1
fi

# Allowed test prefixes (kept in sync with ralph.sh)
ALLOWED_PREFIXES=("npm test" "npx jest" "npx tsc" "npx biome" "bash tests/scripts" "npm run lint" "npm run check-types")

is_allowed_command() {
    local cmd="$1"
    for prefix in "${ALLOWED_PREFIXES[@]}"; do
        [[ "$cmd" == "$prefix"* ]] && return 0
    done
    return 1
}

# Extract ticket title from heading line: "#### Ticket N: Title"
TICKET_TITLE=$(awk -v num="$TICKET_NUM" '
    $0 ~ "^#### Ticket " num ":" {
        sub(/^#### Ticket [0-9]+: */, "")
        print
        exit
    }
' "$BLUEPRINT")

if [ -z "$TICKET_TITLE" ]; then
    log ERROR "Could not parse title for Ticket $TICKET_NUM from '$BLUEPRINT'."
    exit 1
fi

# Extract numbered task lines from the ticket section.
# Task lines match: N. [tag, slug] or N. [tag, slug, ext] description...
TASKS=$(awk -v num="$TICKET_NUM" '
    BEGIN { found = 0 }
    /^#### Ticket [0-9]+/ {
        if (found) exit
        tmp = $0; sub(/^#### Ticket /, "", tmp)
        if ((tmp + 0) == num) { found = 1; next }
    }
    found && /^[0-9]+\. \[/ { print }
' "$BLUEPRINT")

if [ -z "$TASKS" ]; then
    log ERROR "No tasks found for Ticket $TICKET_NUM in '$BLUEPRINT'."
    exit 1
fi

# Build PRD content + sidecar mapping. Validate strictly: any malformed line aborts.
SIDECAR="PRD.md.tests.tsv"
: > "$SIDECAR"

PRD_CONTENT=$(
    printf '# PRD: %s\n\n## Tasks\n' "$TICKET_TITLE"

    while IFS= read -r line; do
        [[ -z "$line" ]] && continue

        # Match [tag, slug, ext] (preferred) or [tag, slug] (legacy).
        if [[ "$line" =~ ^[0-9]+\.\ \[([a-z]+),\ ([a-z0-9-]+),\ ([a-z]+)\]\ (.+)$ ]]; then
            tag="${BASH_REMATCH[1]}"
            slug="${BASH_REMATCH[2]}"
            ext="${BASH_REMATCH[3]}"
            description="${BASH_REMATCH[4]}"
        elif [[ "$line" =~ ^[0-9]+\.\ \[([a-z]+),\ ([a-z0-9-]+)\]\ (.+)$ ]]; then
            tag="${BASH_REMATCH[1]}"
            slug="${BASH_REMATCH[2]}"
            ext=""
            description="${BASH_REMATCH[3]}"
        else
            log ERROR "Malformed task line (expected '\\d+. [tag, slug] desc' or '[tag, slug, ext] desc'):" >&2
            log ERROR "  $line" >&2
            exit 1
        fi

        case "$tag" in
            infra)
                test_cmd="bash tests/scripts/${slug}.sh"
                test_path="tests/scripts/${slug}.sh"
                ;;
            code)
                # Default ext to tsx when missing (back-compat with old blueprints).
                ext_resolved="${ext:-tsx}"
                if [[ "$ext_resolved" != "ts" && "$ext_resolved" != "tsx" ]]; then
                    log ERROR "Unsupported ext '$ext_resolved' for task: $line" >&2
                    exit 1
                fi
                test_cmd="npx jest tests/unit/${slug}.test.${ext_resolved}"
                test_path="tests/unit/${slug}.test.${ext_resolved}"
                ;;
            *)
                log ERROR "Unsupported tag '$tag' (expected 'infra' or 'code') in: $line" >&2
                exit 1
                ;;
        esac

        if ! is_allowed_command "$test_cmd"; then
            log ERROR "Refusing to emit task with disallowed test command: $test_cmd" >&2
            exit 1
        fi

        # Hash the rendered task line so isolator can look up the test path
        # without re-parsing the test command.
        rendered_line="- [ ] ${description} \`[test: ${test_cmd}]\`"
        line_hash=$(printf '%s' "$rendered_line" | shasum | awk '{print $1}')
        printf '%s\t%s\n' "$line_hash" "$test_path" >> "$SIDECAR"

        printf '\n%s' "$rendered_line"
    done <<< "$TASKS"

    printf '\n'
)

printf '%s\n' "$PRD_CONTENT" > PRD.md

log SUCCESS "Generated PRD.md for Ticket $TICKET_NUM: $TICKET_TITLE"
log INFO "Wrote $SIDECAR with $(wc -l < "$SIDECAR" | tr -d ' ') task→test mappings."
