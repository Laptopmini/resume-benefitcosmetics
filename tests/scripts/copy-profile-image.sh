#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f ./public/profile.png
assert "public/.nojekyll exists" test -f ./public/.nojekyll
assert "root profile.png still exists" test -f ./profile.png

verify_binary_copy() {
  local desc="public/profile.png matches root profile.png"
  if [ ! -f ./profile.png ] || [ ! -f ./public/profile.png ]; then
    _fail "$desc (files missing)"
    return 0
  fi
  local root_hash pub_hash
  root_hash=$(shasum -a 256 ./profile.png | awk '{print $1}')
  pub_hash=$(shasum -a 256 ./public/profile.png | awk '{print $1}')
  if [ "$root_hash" = "$pub_hash" ]; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

verify_binary_copy

verify_nojekyll_empty() {
  local desc=".nojekyll is empty"
  if [ -f ./public/.nojekyll ] && [ ! -s ./public/.nojekyll ]; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

verify_nojekyll_empty

report_results
