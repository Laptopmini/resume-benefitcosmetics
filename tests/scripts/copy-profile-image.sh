#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

fail() { echo "FAIL: $1" >&2; exit 1; }

[ -f "$ROOT/public/profile.png" ] || fail "public/profile.png not found"
[ -s "$ROOT/public/profile.png" ] || fail "public/profile.png is empty"
[ -f "$ROOT/public/.nojekyll" ] || fail "public/.nojekyll not found"

# Verify it's a valid PNG (starts with PNG magic bytes)
if command -v file &>/dev/null; then
  file "$ROOT/public/profile.png" | grep -qi 'png' || fail "public/profile.png is not a valid PNG"
fi

echo "PASS: copy-profile-image"
