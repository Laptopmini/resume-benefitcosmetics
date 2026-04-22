#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="$ROOT/postcss.config.mjs"
FAIL=0

echo "=== Checking postcss.config.mjs ==="

if [ ! -f "$CONFIG" ]; then
  echo "FAIL: postcss.config.mjs does not exist"
  exit 1
fi

check() {
  local label="$1" code="$2"
  if node --input-type=module -e "$code" 2>/dev/null; then
    echo "PASS: $label"
  else
    echo "FAIL: $label"
    FAIL=1
  fi
}

check "exports plugins with @tailwindcss/postcss" \
  "import c from '$CONFIG'; if(!c.plugins?.['@tailwindcss/postcss']) process.exit(1)"

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
