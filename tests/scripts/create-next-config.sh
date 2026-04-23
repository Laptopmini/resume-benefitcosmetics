#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    echo "  PASS: $desc"
    ((PASS++))
  else
    echo "  FAIL: $desc"
    ((FAIL++))
  fi
}

echo "=== Task: Create Next.js configuration module ==="

check "next.config.mjs exists" test -f next.config.mjs

check "config has output: export" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (c.output !== 'export') process.exit(1);
"

check "config has basePath" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (c.basePath !== '/ralph-node-resume') process.exit(1);
"

check "config has assetPrefix" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (c.assetPrefix !== '/ralph-node-resume') process.exit(1);
"

check "config has images.unoptimized" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (!c.images || c.images.unoptimized !== true) process.exit(1);
"

check "config has trailingSlash" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (c.trailingSlash !== true) process.exit(1);
"

check "config has reactStrictMode" node --input-type=module -e "
  import config from './next.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (c.reactStrictMode !== true) process.exit(1);
"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
