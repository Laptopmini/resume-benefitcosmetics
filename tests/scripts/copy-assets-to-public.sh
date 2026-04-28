#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "public/profile.png exists" test -f "public/profile.png"
assert "public/.nojekyll exists" test -f "public/.nojekyll"

# Verify profile.png is a valid PNG (binary check - PNG files start with 8-byte magic header)
assert "profile.png is a PNG (magic header 89 50 4E 47)" node -e "
const fs = require('fs');
const buf = fs.readFileSync('public/profile.png');
const magic = buf.slice(0, 8);
const expected = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
if (!magic.equals(expected)) throw new Error('Not a valid PNG');
"

report_results