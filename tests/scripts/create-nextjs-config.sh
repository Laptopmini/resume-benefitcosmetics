#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./next.config.mjs"

assert "next.config.mjs exists" test -f "$CFG"

assert_node() {
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

assert_node "output is export" "c.output === 'export'"
assert_node "basePath is /ralph-node-resume" "c.basePath === '/ralph-node-resume'"
assert_node "assetPrefix is /ralph-node-resume" "c.assetPrefix === '/ralph-node-resume'"
assert_node "images.unoptimized is true" "c.images && c.images.unoptimized === true"
assert_node "trailingSlash is true" "c.trailingSlash === true"
assert_node "reactStrictMode is true" "c.reactStrictMode === true"

report_results
