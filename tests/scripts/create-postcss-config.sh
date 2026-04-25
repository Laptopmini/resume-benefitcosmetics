#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./postcss.config.mjs"

assert "postcss.config.mjs exists" test -f "$CFG"
assert_grep "@tailwindcss/postcss plugin" "@tailwindcss/postcss" "$CFG"

validate_postcss() {
  local desc="postcss config exports correct plugin structure"
  if node -e "
    import('$CFG').then(m => {
      const c = m.default;
      if (!c.plugins || !('@tailwindcss/postcss' in c.plugins)) process.exit(1);
    }).catch(() => process.exit(1));
  " 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

validate_postcss

report_results
