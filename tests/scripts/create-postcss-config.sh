#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_grep "@tailwindcss/postcss plugin is set" "'@tailwindcss/postcss'" "./postcss.config.mjs"

report_results