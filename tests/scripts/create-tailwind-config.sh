#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CONFIG="tailwind.config.ts"

assert "tailwind.config.ts exists" test -f "$CONFIG"
assert_grep "export default" "export default" "$CONFIG"
assert_grep "content glob" "./src/**/*.{ts,tsx}" "$CONFIG"

# Colors
assert_grep "rose color" "var(--rose)" "$CONFIG"
assert_grep "cream color" "var(--cream)" "$CONFIG"
assert_grep "ink color" "var(--ink)" "$CONFIG"
assert_grep "mustard color" "var(--mustard)" "$CONFIG"
assert_grep "mint color" "var(--mint)" "$CONFIG"
assert_grep "blush color" "var(--blush)" "$CONFIG"
assert_grep "gold color" "var(--gold-foil)" "$CONFIG"

# Fonts
assert_grep "display font" "var(--font-display)" "$CONFIG"
assert_grep "script font" "var(--font-script)" "$CONFIG"
assert_grep "body font" "var(--font-body)" "$CONFIG"
assert_grep "mono font" "var(--font-mono)" "$CONFIG"

# Shadows
assert_grep "hard shadow" "6px 6px 0 var(--ink)" "$CONFIG"
assert_grep_regex "pin shadow" "2px 4px 0 rgba(26,20,16,0\\.45)" "$CONFIG"

# Max width
assert_grep "editorial maxWidth" "1100px" "$CONFIG"

report_results
