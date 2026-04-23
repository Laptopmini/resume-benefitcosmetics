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

echo "=== Task: Create PostCSS configuration module ==="

check "postcss.config.mjs exists" test -f postcss.config.mjs

check "config has @tailwindcss/postcss plugin" node --input-type=module -e "
  import config from './postcss.config.mjs';
  const c = typeof config === 'function' ? config() : config;
  if (!c.plugins || !('@tailwindcss/postcss' in c.plugins)) process.exit(1);
"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
