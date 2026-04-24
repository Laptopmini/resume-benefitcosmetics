#!/bin/bash
set -e

# Delete src/index.ts task — verify file no longer exists

if [ -f "src/index.ts" ]; then
  echo "FAIL: src/index.ts still exists on disk"
  exit 1
fi

# Also verify nothing imports it
if grep -r "from.*src/index" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . 2>/dev/null | grep -v node_modules | grep -v ".test." | grep -v ".spec."; then
  echo "FAIL: Something still imports src/index.ts"
  exit 1
fi

echo "PASS: src/index.ts deleted and no imports found"
exit 0