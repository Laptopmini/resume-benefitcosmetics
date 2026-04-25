#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

assert_grep() {
  local desc="$1"
  local pattern="$2"
  if grep -qF "$pattern" .gitignore 2>/dev/null; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

assert_grep ".gitignore contains .next/" ".next/"
assert_grep ".gitignore contains out/" "out/"
assert_grep ".gitignore contains next-env.d.ts" "next-env.d.ts"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
