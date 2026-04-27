#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

GI="./.gitignore"

assert "gitignore exists" test -f "$GI"
assert_grep ".next/ in gitignore" ".next/" "$GI"
assert_grep "out/ in gitignore" "out/" "$GI"
assert_grep "next-env.d.ts in gitignore" "next-env.d.ts" "$GI"

report_results
