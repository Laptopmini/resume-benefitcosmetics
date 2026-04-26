#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f ./public/profile.png
assert "public/profile.png is non-empty" test -s ./public/profile.png
assert "public/.nojekyll exists" test -f ./public/.nojekyll

# Verify it's a valid PNG (magic bytes)
assert_png() {
  local desc="public/profile.png is a valid PNG"
  if [ ! -f ./public/profile.png ]; then
    _fail "$desc (file not found)"
    return 0
  fi
  if file ./public/profile.png 2>/dev/null | grep -qi png; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}
assert_png

report_results
