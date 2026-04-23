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

echo "=== Task: Remove legacy entry point file ==="

check "src/index.ts does not exist" test ! -f src/index.ts

check "no file imports src/index" node -e "
  const { execSync } = require('child_process');
  try {
    const result = execSync('grep -r \"src/index\" --include=\"*.ts\" --include=\"*.tsx\" --include=\"*.js\" --include=\"*.mjs\" . --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=tests 2>/dev/null || true', { encoding: 'utf8' });
    if (result.trim().length > 0) process.exit(1);
  } catch { process.exit(1); }
"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
