#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="tailwind.config.ts"

assert "tailwind.config.ts exists" test -f "$CFG"
assert_grep "default export" "export default" "$CFG"

# Content
assert_grep_regex "content array has src glob" "src/\*\*/\*" "$CFG"

# Colors
assert_grep "color rose" "var(--rose)" "$CFG"
assert_grep "color cream" "var(--cream)" "$CFG"
assert_grep "color ink" "var(--ink)" "$CFG"
assert_grep "color mustard" "var(--mustard)" "$CFG"
assert_grep "color mint" "var(--mint)" "$CFG"
assert_grep "color blush" "var(--blush)" "$CFG"
assert_grep "color gold" "var(--gold-foil)" "$CFG"

# Font families
assert_grep "font display" "var(--font-display)" "$CFG"
assert_grep "font script" "var(--font-script)" "$CFG"
assert_grep "font body" "var(--font-body)" "$CFG"
assert_grep "font mono" "var(--font-mono)" "$CFG"

# Box shadow
assert_grep "shadow hard" "6px 6px 0 var(--ink)" "$CFG"
assert_grep_regex "shadow pin" "2px 4px 0 rgba" "$CFG"

# Max width
assert_grep "maxWidth editorial" "1100px" "$CFG"

report_results
