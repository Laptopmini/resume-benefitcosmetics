#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Delete src/index.ts — verify the file no longer exists on disk and nothing imports it

assert "src/index.ts does not exist" test ! -f "./src/index.ts"

# Check that nothing imports src/index.ts by searching for such imports
# We search for "./index.ts" or "'./index.ts'" or "\"./index.ts\"" patterns
if grep -r "from.*['\"]\./index\.ts['\"]" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.mjs" . 2>/dev/null | grep -v "node_modules" | grep -v ".test." | grep -v ".spec." >/dev/null 2>&1; then
  _fail "src/index.ts is imported somewhere"
else
  _pass "src/index.ts is not imported anywhere"
fi

report_results
