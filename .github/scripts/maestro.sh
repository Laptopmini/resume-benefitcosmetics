#!/bin/bash

# ==============================================================================
# MAESTRO: Automate the entire process
# Usage: ./maestro.sh
# ==============================================================================

set -euo pipefail

# Settings
LOCK_FILE=".maestro.lock"
LOG_FILE=".maestro.log"
BLUEPRINT_FILE=".maestro.blueprint.md"
ENGINE="claude" # FIXME: Use env variable `ENGINE` with default value `claude`

# Functions

prompt() {
    # FIXME: Make this a reusable script which can be called from other scripts
    local AGENT_PROMPT="$1"
    shift
    local EXTRA_ARGS="$@"

    echo "🟡 Handing control to $ENGINE..."  >&2
    local OUTPUT=""
    local ENGINE_EXIT=0
    if [[ "$ENGINE" == "claude" ]]; then
        set +e
        OUTPUT=$(claude -p "$AGENT_PROMPT" $EXTRA_ARGS)
        ENGINE_EXIT=$?
        set -e

        if [[ "$OUTPUT" == *"rate_limit_error"* ]] || [[ "$OUTPUT" == *"insufficient_quota"* ]] || [[ "$OUTPUT" == *"credit balance"* ]]; then
            echo "🟠 Claude rate limit exceeded." >&2
            exit 1
        fi
    else
        set +e
        OUTPUT=$(opencode run "$AGENT_PROMPT" $EXTRA_ARGS)
        ENGINE_EXIT=$?
        set -e
    fi

    if [[ $ENGINE_EXIT -ne 0 ]]; then
        echo "🟠 Engine exited with code $ENGINE_EXIT." >&2
        exit 1
    fi

    echo "$OUTPUT"
    return 0
}

# ==============================================================================

if [ -e "$LOCK_FILE" ]; then
    echo "❌ Error: Ralph Loop is already running! Exiting..."
    exit 1
fi

touch "$LOCK_FILE"
trap "rm -f $LOCK_FILE $BLUEPRINT_FILE" EXIT

if ! command -v $ENGINE &> /dev/null; then
    echo "❌ Error: $ENGINE CLI is not installed."
    exit 1
fi

if [ -z "$*" ]; then
    echo "❌ Error: No feature(s) request paragraph/description provided."
    echo "Usage: $0 [MAX_LOOPS] [--engine claude|opencode]"
    exit 1
fi

echo "🟢 Beginning orchestration..."

MISSING_BLUEPRINT=true;
while $MISSING_BLUEPRINT; do
    echo "⚪️ Generating implementation plan blueprint..."
    prompt "/blueprint $*" --model claude-opus-4-6 > $BLUEPRINT_FILE

    if command -v code &>/dev/null; then
        code $BLUEPRINT_FILE
    fi

    read -p "💬 Does the blueprint look accurate to you to proceed with generating PRD(s) for it? (Y/n): " -r confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        MISSING_BLUEPRINT=false;
    fi
done

# echo "⚪️ Generating PRD(s)..."
# $(prompt "/ticketmaster
# $BLUEPRINT
# ")

# FIXME: The ticketmaster prompt draft needs to indicate the expected output, array of pr names

# FIXME: Prevent blueprint from generating test files as it may conflict with TDD
# 2. [logic] Create `tests/unit/timer-logic.test.ts` — test `formatTime` (25:00, 00:00, 09:59 edge cases), test `tick` (decrements, does not go below 0), test duration constant equals 1500
# MAKE IT CREATE A TICKET FOR TEST COVERAGE, GATHER THEM ALL AS PART OF A UNIQUE PRD ALWAYS THE LAST ONE?


# ASK IF USER TO HIT ENTER WHEN READY TO REVIEW PRs
# OPEN PR PAGE URL

# ASK IF USER FINISHED REVIEWING PRs
# CHECK IF PRS WERE MERGED
    # IF YES, BRANCH OUT `prd-X-backpressure` AND RUN BACKPRESSURE, OPEN PR BACK AGAINST `prd-X`
    # IF NO, ERROR OUT?

# ASK IF USER TO HIT ENTER WHEN READY TO REVIEW PRs
# OPEN PR PAGE URL

# ASK IF USER FINISHED REVIEWING PRs
    # IF YES, For each `dev-prd-X` branch, execute `ralph.sh` in parallel and open PR against `main`.

echo "✅ Done!."