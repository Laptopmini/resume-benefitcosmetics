#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="postcss.config.mjs"

assert "postcss.config.mjs exists" test -f "$CFG"
assert_grep "has export default" "export default" "$CFG"
assert_grep "has tailwindcss plugin" "tailwindcss" "$CFG"
assert_grep "has autoprefixer plugin" "autoprefixer" "$CFG"

report_results
