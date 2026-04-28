#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "src/index.ts does not exist" test '!' -f "src/index.ts"

report_results