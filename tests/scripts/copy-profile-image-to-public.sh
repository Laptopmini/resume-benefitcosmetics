#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

assert() {
  local desc="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

assert "public/profile.png exists" test -f public/profile.png
assert "public/profile.png is non-empty" test -s public/profile.png
assert "public/.nojekyll exists" test -f public/.nojekyll

# Verify it's an actual PNG (magic bytes)
assert "public/profile.png is a valid PNG" bash -c "file public/profile.png | grep -qi png"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
