#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Verify Next.js dependencies are installed
assert_json "next is installed" "_.dependencies.next" "./package.json"
assert_json "react is installed" "_.dependencies.react" "./package.json"
assert_json "react-dom is installed" "_.dependencies['react-dom']" "./package.json"
assert_json "framer-motion is installed" "_.dependencies['framer-motion']" "./package.json"

# Verify dev dependencies are installed
assert_json "tailwindcss is installed" "_.devDependencies.tailwindcss" "./package.json"
assert_json "@tailwindcss/postcss is installed" "_.devDependencies['@tailwindcss/postcss']" "./package.json"
assert_json "postcss is installed" "_.devDependencies.postcss" "./package.json"
assert_json "@types/react is installed" "_.devDependencies['@types/react']" "./package.json"
assert_json "@types/react-dom is installed" "_.devDependencies['@types/react-dom']" "./package.json"
assert_json "@types/node is installed" "_.devDependencies['@types/node']" "./package.json"

# Verify scripts exist
assert_grep "dev script exists" '"dev": "next dev"' "./package.json"
assert_grep "build script exists" '"build": "next build"' "./package.json"
assert_grep "start script exists" '"start": "next start"' "./package.json"
assert_grep "test script exists" '"test"' "./package.json"
assert_grep "lint script exists" '"lint"' "./package.json"
assert_grep "check-types script exists" '"check-types"' "./package.json"

report_results