#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_grep ".next is in gitignore" ".next/" "./.gitignore"
assert_grep "out is in gitignore" "out/" "./.gitignore"
assert_grep "next-env.d.ts is in gitignore" "next-env.d.ts" "./.gitignore"

report_results