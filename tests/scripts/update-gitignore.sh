#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_grep ".next/ in .gitignore" ".next/" ".gitignore"
assert_grep "out/ in .gitignore" "out/" ".gitignore"
assert_grep "next-env.d.ts in .gitignore" "next-env.d.ts" ".gitignore"

report_results