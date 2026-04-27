#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_grep "output: 'export' is set" "output: 'export'" "./next.config.mjs"
assert_grep "basePath is /ralph-node-resume" "basePath: '/ralph-node-resume'" "./next.config.mjs"
assert_grep "assetPrefix is /ralph-node-resume" "assetPrefix: '/ralph-node-resume'" "./next.config.mjs"
assert_grep "images unoptimized is true" "unoptimized: true" "./next.config.mjs"
assert_grep "trailingSlash is true" "trailingSlash: true" "./next.config.mjs"
assert_grep "reactStrictMode is true" "reactStrictMode: true" "./next.config.mjs"

report_results