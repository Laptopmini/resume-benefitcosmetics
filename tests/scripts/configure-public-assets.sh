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

echo "=== Task: Configure public assets and disable Jekyll ==="

check "public/profile.png exists" test -f public/profile.png
check "public/profile.png is a valid PNG" file public/profile.png | grep -qi png
check "public/.nojekyll exists" test -f public/.nojekyll

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
