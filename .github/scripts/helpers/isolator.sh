#!/usr/bin/env bash

BACKPRESSURE_BACKUP_FOLDER=".maestro.backpressure"
BACKPRESSURE_FOLDER="tests"
TASK_TEST_SIDECAR="PRD.md.tests.tsv"

# Resolve the test file path for the active task line. Prefer the sidecar
# emitted by generate-prd.sh; fall back to parsing the test command's last token.
# Args: $1 = active PRD task line (the rendered `- [ ] ... [test: cmd]`)
#       $2 = test command (e.g. "npx jest tests/unit/foo.test.tsx")
_resolve_test_path() {
    local task_line="$1"
    local cmd="$2"

    if [[ -s "$TASK_TEST_SIDECAR" && -n "$task_line" ]]; then
        local hash
        hash=$(printf '%s' "$task_line" | shasum | awk '{print $1}')
        local mapped
        mapped=$(awk -v h="$hash" -F'\t' '$1==h {print $2; exit}' "$TASK_TEST_SIDECAR")
        if [[ -n "$mapped" ]]; then
            printf '%s' "$mapped"
            return 0
        fi
    fi

    # Fallback: last whitespace-separated token, only if it looks like a path.
    local last="${cmd##* }"
    if [[ "$last" == *.* && "$last" == */* ]]; then
        printf '%s' "$last"
        return 0
    fi

    return 1
}

# Moves all tests to a backup folder to avoid agents reading them before they are needed
isolate_backpressure() {
    log INFO "Isolating backpressure..."
    if [[ -d "$BACKPRESSURE_BACKUP_FOLDER" ]]; then
        log ERROR "There is already backpressure isolated. Aborting."
        exit 1
    fi

    if [[ ! -d "$BACKPRESSURE_FOLDER" ]]; then
        log WARN "There is no backpressure to isolate. Skipping isolation..."
        return 0
    fi

    # Move e2e, scripts, and unit folders to ".maestro.backpressure/tests/"
    mkdir -p "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER"
    [ -e "$BACKPRESSURE_FOLDER/e2e" ] && mv -f "$BACKPRESSURE_FOLDER/e2e" "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER/e2e"
    [ -e "$BACKPRESSURE_FOLDER/scripts" ] && mv -f "$BACKPRESSURE_FOLDER/scripts" "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER/scripts"
    [ -e "$BACKPRESSURE_FOLDER/unit" ] && mv -f "$BACKPRESSURE_FOLDER/unit" "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER/unit"

    log INFO "Isolated backpressure!"
}

# Restore backpressure to its original location so that the agents can read them.
# Usage:
#   restore_backpressure                      # restore everything in the backup
#   restore_backpressure "<test-command>"     # restore the file for the active task only
#   restore_backpressure "<cmd>" "<task-line>"# preferred: lets sidecar resolve precisely
restore_backpressure() {
    local COMMAND="${1:-}"
    local TASK_LINE="${2:-${CURRENT_TASK:-}}"

    if [ -z "$COMMAND" ]; then
        log INFO "Restoring all backpressure..."

        if [[ ! -d "$BACKPRESSURE_BACKUP_FOLDER" ]]; then
            log WARN "There is no remaining backpressure to restore. Skipping restoration..."
            return 0
        fi

        mkdir -p "$BACKPRESSURE_FOLDER"
        rsync -av --ignore-existing "$BACKPRESSURE_BACKUP_FOLDER/$BACKPRESSURE_FOLDER"/ "$BACKPRESSURE_FOLDER"/
        rm -rf "$BACKPRESSURE_BACKUP_FOLDER"
        log INFO "Restored backpressure!"
        return 0
    fi

    log INFO "Restoring backpressure for $COMMAND..."

    local file_path
    if ! file_path=$(_resolve_test_path "$TASK_LINE" "$COMMAND"); then
        log INFO "No test file resolvable from '$COMMAND'. Skipping restoration..."
        return 0
    fi

    # Already in place — nothing to do (deterministic, not a heuristic).
    if [[ -f "$file_path" ]]; then
        log INFO "The file $file_path is already in place. Skipping restoration..."
        return 0
    fi

    if [[ ! -f "$BACKPRESSURE_BACKUP_FOLDER/$file_path" ]]; then
        log WARN "The test file $file_path does not exist in $BACKPRESSURE_BACKUP_FOLDER. Skipping restoration..."
        return 0
    fi

    mkdir -p "$(dirname "$file_path")"
    mv -f "$BACKPRESSURE_BACKUP_FOLDER/$file_path" "$file_path"

    log INFO "Restored backpressure!"
}

remove_backpressure() {
    log INFO "Removing backpressure..."
    local NEW_TESTS=$(git diff --name-only maestro...HEAD | grep '^tests/' || true)

    if [ -z "$NEW_TESTS" ]; then
        log INFO "No backpressure to remove. Continuing..."
        return 0
    fi

    echo "$NEW_TESTS" | xargs git rm

    git add .
    git diff --cached --quiet || git commit -m "chore(ai): Clean out backpressure"

    log INFO "Removed backpressure!"
}
