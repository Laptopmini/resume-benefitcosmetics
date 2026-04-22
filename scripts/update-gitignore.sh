#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
GITIGNORE="$ROOT/.gitignore"
FAIL=0

check_entry() {
  local pattern="$1"
  if grep -qF "$pattern" "$GITIGNORE"; then
    echo "PASS: .gitignore contains '$pattern'"
  else
    echo "FAIL: .gitignore missing '$pattern'"
    FAIL=1
  fi
}

echo "=== Checking .gitignore entries ==="
check_entry ".next/"
check_entry "out/"
check_entry "next-env.d.ts"

echo ""
echo "=== Running biome check ==="
npx biome check "$ROOT"

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "FAILED: Some checks did not pass."
  exit 1
fi

echo ""
echo "All checks passed."
