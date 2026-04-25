#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

GIT_IGNORE="./.gitignore"

assert "gitignore exists" test -f "$GIT_IGNORE"
assert_grep ".next/ in gitignore" ".next/" "$GIT_IGNORE"
assert_grep "out/ in gitignore" "out/" "$GIT_IGNORE"
assert_grep "next-env.d.ts in gitignore" "next-env.d.ts" "$GIT_IGNORE"

report_results
