#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./postcss.config.mjs"

assert "postcss.config.mjs exists" test -f "$CFG"
assert_grep "@tailwindcss/postcss plugin" "@tailwindcss/postcss" "$CFG"

check_postcss_config() {
  node -e "
    import('$CFG').then(m => {
      const c = m.default;
      if (c.plugins && '@tailwindcss/postcss' in c.plugins) process.exit(0);
      else process.exit(1);
    }).catch(() => process.exit(1));
  " 2>/dev/null
}

assert "postcss config exports correct plugin" check_postcss_config

report_results
