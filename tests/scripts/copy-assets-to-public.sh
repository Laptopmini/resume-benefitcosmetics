#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Copy profile.png to public/profile.png and create public/.nojekyll

assert "public/profile.png exists" test -f "./public/profile.png"

assert "public/.nojekyll exists" test -f "./public/.nojekyll"

report_results
