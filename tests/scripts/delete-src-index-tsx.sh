#!/bin/bash
set -e

# Verify src/index.ts is deleted
if [ -f "src/index.ts" ]; then
  echo "FAIL: src/index.ts still exists on disk"
  exit 1
fi

# Verify nothing imports src/index.ts
if grep -r "from.*src/index" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "dist"; then
  echo "FAIL: something still imports src/index"
  exit 1
fi

if grep -r "from ['\"].*src/index['\"]" --include="*.ts" --include="*.tsx" . 2>/dev/null | grep -v "node_modules" | grep -v ".next" | grep -v "dist"; then
  echo "FAIL: something still imports src/index"
  exit 1
fi

echo "PASS: src/index.ts deleted and no imports found"