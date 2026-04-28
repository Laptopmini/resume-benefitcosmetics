#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CSS="src/app/globals.css"

assert "globals.css exists" test -f "$CSS"

# Tailwind directives
assert_grep "tailwind base" "@tailwind base" "$CSS"
assert_grep "tailwind components" "@tailwind components" "$CSS"
assert_grep "tailwind utilities" "@tailwind utilities" "$CSS"

# CSS variables
assert_grep "rose variable" "--rose: #c44a5e" "$CSS"
assert_grep "cream variable" "--cream: #f4ead5" "$CSS"
assert_grep "ink variable" "--ink: #1a1410" "$CSS"
assert_grep "mustard variable" "--mustard: #d99a2b" "$CSS"
assert_grep "mint variable" "--mint: #6fa88e" "$CSS"
assert_grep "blush variable" "--blush: #f0c9c1" "$CSS"
assert_grep "gold-foil variable" "--gold-foil: #c9a14a" "$CSS"

# Body rule
assert_grep "body bg cream" "var(--cream)" "$CSS"
assert_grep "body color ink" "var(--ink)" "$CSS"

# Component layer
assert_grep "ink-rule class" "ink-rule" "$CSS"
assert_grep "editorial-card class" "editorial-card" "$CSS"
assert_grep "shadow-hard usage" "shadow-hard" "$CSS"

# Utility layer
assert_grep "paper-grain class" "paper-grain" "$CSS"
assert_grep_regex "paper grain gradient" "radial-gradient" "$CSS"
assert_grep "paper grain size" "4px 4px" "$CSS"

report_results
