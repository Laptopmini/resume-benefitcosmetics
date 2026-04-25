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

assert_content() {
  local desc="$1"
  local pattern="$2"
  if grep -q "$pattern" next.config.mjs 2>/dev/null; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

assert "next.config.mjs exists" test -f next.config.mjs
assert_content "output is export" "output.*['\"]export['\"]"
assert_content "basePath is /ralph-node-resume" "basePath.*['\"/]ralph-node-resume['\"]"
assert_content "assetPrefix is /ralph-node-resume" "assetPrefix.*['\"/]ralph-node-resume['\"]"
assert_content "images unoptimized" "unoptimized.*true"
assert_content "trailingSlash is true" "trailingSlash.*true"
assert_content "reactStrictMode is true" "reactStrictMode.*true"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
