#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Append .next/, out/, and next-env.d.ts to .gitignore

assert_grep ".gitignore contains .next/" ".next/" "./.gitignore"

assert_grep ".gitignore contains out/" "out/" "./.gitignore"

assert_grep ".gitignore contains next-env.d.ts" "next-env.d.ts" "./.gitignore"

report_results
