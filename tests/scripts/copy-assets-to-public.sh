#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

if [ ! -f "./public/profile.png" ]; then
  _fail "public/profile.png does not exist"
else
  _pass "public/profile.png exists"
fi

if [ ! -f "./public/.nojekyll" ]; then
  _fail "public/.nojekyll does not exist"
else
  _pass "public/.nojekyll exists"
fi

report_results