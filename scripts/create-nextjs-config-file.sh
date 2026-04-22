#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="$ROOT/next.config.mjs"
FAIL=0

echo "=== Checking next.config.mjs ==="

if [ ! -f "$CONFIG" ]; then
  echo "FAIL: next.config.mjs does not exist"
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

check "output is export" \
  "import c from '$CONFIG'; if(c.output!=='export') process.exit(1)"

check "basePath is /ralph-node-resume" \
  "import c from '$CONFIG'; if(c.basePath!=='/ralph-node-resume') process.exit(1)"

check "assetPrefix is /ralph-node-resume" \
  "import c from '$CONFIG'; if(c.assetPrefix!=='/ralph-node-resume') process.exit(1)"

check "images.unoptimized is true" \
  "import c from '$CONFIG'; if(c.images?.unoptimized!==true) process.exit(1)"

check "trailingSlash is true" \
  "import c from '$CONFIG'; if(c.trailingSlash!==true) process.exit(1)"

check "reactStrictMode is true" \
  "import c from '$CONFIG'; if(c.reactStrictMode!==true) process.exit(1)"

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
