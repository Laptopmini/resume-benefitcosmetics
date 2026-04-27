#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Create next.config.mjs with specific config

assert "next.config.mjs exists" test -f "./next.config.mjs"

assert_grep_regex "next.config.mjs exports output: 'export'" "output:\s*['\"]export['\"]" "./next.config.mjs"

assert_grep_regex "next.config.mjs exports basePath: '/ralph-node-resume'" "basePath:\s*['\"]/ralph-node-resume['\"]" "./next.config.mjs"

assert_grep_regex "next.config.mjs exports assetPrefix: '/ralph-node-resume'" "assetPrefix:\s*['\"]/ralph-node-resume['\"]" "./next.config.mjs"

assert_grep_regex "next.config.mjs exports images.unoptimized: true" "unoptimized:\s*true" "./next.config.mjs"

assert_grep_regex "next.config.mjs exports trailingSlash: true" "trailingSlash:\s*true" "./next.config.mjs"

assert_grep_regex "next.config.mjs exports reactStrictMode: true" "reactStrictMode:\s*true" "./next.config.mjs"

report_results
