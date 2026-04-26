#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./postcss.config.mjs"

assert "postcss.config.mjs exists" test -f "$CFG"

assert_postcss() {
  local desc="$1" expr="$2"
  if node -e "
    import('$CFG').then(m => {
      const c = m.default || m;
      if (!($expr)) process.exit(1);
    }).catch(() => process.exit(1));
  " 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_postcss "has @tailwindcss/postcss plugin" "c.plugins && c.plugins['@tailwindcss/postcss'] !== undefined"

report_results
