#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f ./public/profile.png
assert "public/.nojekyll exists" test -f ./public/.nojekyll

check_binary_match() {
  if [ ! -f ./profile.png ] || [ ! -f ./public/profile.png ]; then
    return 1
  fi
  cmp -s ./profile.png ./public/profile.png
}

assert "public/profile.png matches root profile.png" check_binary_match

check_nojekyll_empty() {
  [ -f ./public/.nojekyll ] && [ ! -s ./public/.nojekyll ]
}

assert ".nojekyll is empty" check_nojekyll_empty

report_results
