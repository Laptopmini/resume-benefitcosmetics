#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Create postcss.config.mjs exporting { plugins: { '@tailwindcss/postcss': {} } }

assert "postcss.config.mjs exists" test -f "./postcss.config.mjs"

assert_grep "postcss.config.mjs exports '@tailwindcss/postcss'" "'@tailwindcss/postcss'" "./postcss.config.mjs"

report_results
