#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="next.config.mjs"

assert "next.config.mjs exists" test -f "$CFG"
assert_grep "has export default" "export default" "$CFG"
assert_grep "output export" "export" "$CFG"
assert_grep_regex "output is export" "output.*['\"]export['\"]" "$CFG"
assert_grep "basePath" "/ralph-node-resume" "$CFG"
assert_grep_regex "basePath key" "basePath" "$CFG"
assert_grep_regex "assetPrefix key" "assetPrefix" "$CFG"
assert_grep_regex "images unoptimized" "unoptimized.*true" "$CFG"
assert_grep_regex "trailingSlash true" "trailingSlash.*true" "$CFG"
assert_grep_regex "reactStrictMode true" "reactStrictMode.*true" "$CFG"

report_results
