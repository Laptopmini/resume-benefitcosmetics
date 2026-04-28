#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "types/css.d.ts exists" test -f types/css.d.ts
assert_grep "declares css module" "*.css" "types/css.d.ts"
assert_grep "declare module" "declare module" "types/css.d.ts"

report_results
