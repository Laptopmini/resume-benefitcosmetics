#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "src/index.ts does not exist" test ! -f ./src/index.ts

# Ensure nothing imports it
assert_not_imported() {
  local desc="no file imports src/index"
  if grep -r "src/index" --include='*.ts' --include='*.tsx' --include='*.js' --include='*.mjs' . \
       --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist --exclude-dir=tests -l 2>/dev/null | grep -q .; then
    _fail "$desc"
  else
    _pass "$desc"
  fi
}
assert_not_imported

report_results
