#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./next.config.mjs"

assert "next.config.mjs exists" test -f "$CFG"
assert_grep "output export" "export" "$CFG"
assert_grep "basePath set" "/ralph-node-resume" "$CFG"
assert_grep "assetPrefix set" "assetPrefix" "$CFG"
assert_grep "unoptimized images" "unoptimized" "$CFG"
assert_grep "trailingSlash" "trailingSlash" "$CFG"
assert_grep "reactStrictMode" "reactStrictMode" "$CFG"

validate_config() {
  local desc="config exports valid object with required fields"
  if node -e "
    import('$CFG').then(m => {
      const c = m.default;
      if (c.output !== 'export') process.exit(1);
      if (c.basePath !== '/ralph-node-resume') process.exit(1);
      if (c.assetPrefix !== '/ralph-node-resume') process.exit(1);
      if (!c.images || c.images.unoptimized !== true) process.exit(1);
      if (c.trailingSlash !== true) process.exit(1);
      if (c.reactStrictMode !== true) process.exit(1);
    }).catch(() => process.exit(1));
  " 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

validate_config

report_results
