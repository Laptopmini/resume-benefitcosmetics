#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET="$ROOT/src/index.ts"
FAIL=0

echo "=== Checking src/index.ts is deleted ==="

if [ -f "$TARGET" ]; then
  echo "FAIL: src/index.ts still exists"
  FAIL=1
else
  echo "PASS: src/index.ts does not exist"
fi

# Ensure nothing imports src/index.ts
IMPORTS=$(grep -rl "src/index" "$ROOT/src" "$ROOT/app" "$ROOT/tests" 2>/dev/null || true)
if [ -n "$IMPORTS" ]; then
  echo "FAIL: The following files still import src/index:"
  echo "$IMPORTS"
  FAIL=1
else
  echo "PASS: No files import src/index"
fi

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "FAILED: Some checks did not pass."
  exit 1
fi

echo ""
echo "All checks passed."
