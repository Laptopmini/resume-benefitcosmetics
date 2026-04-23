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

echo "=== Task: Add build artifacts to gitignore ==="

check ".next/ is in .gitignore" grep -qF '.next/' .gitignore
check "out/ is in .gitignore" grep -qF 'out/' .gitignore
check "next-env.d.ts is in .gitignore" grep -qF 'next-env.d.ts' .gitignore

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
