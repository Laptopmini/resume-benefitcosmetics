#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "postcss.config.mjs exists" test -f "postcss.config.mjs"

assert "postcss.config.mjs exports plugins object" node -e "
import('./postcss.config.mjs').then(m => {
  if (typeof m.plugins !== 'object' || m.plugins === null) throw new Error('plugins not object');
}).catch(() => { throw new Error('cannot import'); })
"
assert "postcss.config.mjs has @tailwindcss/postcss plugin" node -e "
import('./postcss.config.mjs').then(m => {
  if (!('@tailwindcss/postcss' in m.plugins)) throw new Error('missing @tailwindcss/postcss');
}).catch(() => { throw new Error('cannot import'); })
"

report_results