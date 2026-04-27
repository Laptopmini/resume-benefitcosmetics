#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

if [ -f "./src/index.ts" ]; then
  _fail "src/index.ts still exists"
else
  _pass "src/index.ts does not exist"
fi

report_results