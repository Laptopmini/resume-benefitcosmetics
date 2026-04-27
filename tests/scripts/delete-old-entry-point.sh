#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "src/index.ts does not exist" test ! -f ./src/index.ts

no_imports() {
  if grep -rq "src/index" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.mjs" . 2>/dev/null \
    | grep -v node_modules | grep -v .next | grep -v dist | grep -qv "delete-old-entry-point"; then
    return 1
  fi
  return 0
}

assert "nothing imports src/index" no_imports

report_results
