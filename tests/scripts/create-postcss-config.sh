#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CONFIG="postcss.config.mjs"

assert "postcss.config.mjs exists" test -f "$CONFIG"
assert_grep "export default" "export default" "$CONFIG"
assert_grep "tailwindcss plugin" "tailwindcss" "$CONFIG"
assert_grep "autoprefixer plugin" "autoprefixer" "$CONFIG"

assert "config loads with correct plugins" node -e "
  import('./postcss.config.mjs').then(m => {
    const c = m.default;
    if (!c.plugins || !('tailwindcss' in c.plugins) || !('autoprefixer' in c.plugins)) process.exit(1);
  });
"

report_results
