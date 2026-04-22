#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FAIL=0

echo "=== Checking public/profile.png ==="

if [ ! -f "$ROOT/public/profile.png" ]; then
  echo "FAIL: public/profile.png does not exist"
  FAIL=1
else
  echo "PASS: public/profile.png exists"
  # Verify it's a valid PNG (check magic bytes)
  MAGIC=$(xxd -l 4 -p "$ROOT/public/profile.png")
  if [ "$MAGIC" = "89504e47" ]; then
    echo "PASS: public/profile.png is a valid PNG"
  else
    echo "FAIL: public/profile.png is not a valid PNG file"
    FAIL=1
  fi
  # Verify it matches the root profile.png
  if cmp -s "$ROOT/profile.png" "$ROOT/public/profile.png"; then
    echo "PASS: public/profile.png matches root profile.png"
  else
    echo "FAIL: public/profile.png does not match root profile.png"
    FAIL=1
  fi
fi

echo ""
echo "=== Checking public/.nojekyll ==="

if [ ! -f "$ROOT/public/.nojekyll" ]; then
  echo "FAIL: public/.nojekyll does not exist"
  FAIL=1
else
  echo "PASS: public/.nojekyll exists"
fi

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "FAILED: Some checks did not pass."
  exit 1
fi

echo ""
echo "All checks passed."
