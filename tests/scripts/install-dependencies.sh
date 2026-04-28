#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Runtime deps
assert_json "has next" "_.dependencies.next" "./package.json"
assert_json "has react" "_.dependencies.react" "./package.json"
assert_json "has react-dom" "_.dependencies['react-dom']" "./package.json"
assert_json "has framer-motion" "_.dependencies['framer-motion']" "./package.json"
assert_json "has tailwindcss" "_.dependencies.tailwindcss" "./package.json"
assert_json "has postcss" "_.dependencies.postcss" "./package.json"
assert_json "has autoprefixer" "_.dependencies.autoprefixer" "./package.json"

# Dev deps
assert_json "has @types/react" "_.devDependencies['@types/react']" "./package.json"
assert_json "has @types/react-dom" "_.devDependencies['@types/react-dom']" "./package.json"
assert_json "has jest-environment-jsdom" "_.devDependencies['jest-environment-jsdom']" "./package.json"
assert_json "has @testing-library/react" "_.devDependencies['@testing-library/react']" "./package.json"
assert_json "has @testing-library/jest-dom" "_.devDependencies['@testing-library/jest-dom']" "./package.json"

# Scripts
assert_json "has dev script" '_.scripts.dev === "next dev"' "./package.json"
assert_json "has build script" '_.scripts.build === "next build"' "./package.json"
assert_json "has start script" '_.scripts.start === "next start"' "./package.json"

# Existing scripts not removed
assert_json "kept test script" "_.scripts.test" "./package.json"
assert_json "kept test:unit script" "_.scripts['test:unit']" "./package.json"
assert_json "kept test:e2e script" "_.scripts['test:e2e']" "./package.json"

# Placeholder deleted
assert "src/index.ts deleted" test ! -f src/index.ts

# Public assets
assert "public/profile.png exists" test -f public/profile.png
assert "public/.nojekyll exists" test -f public/.nojekyll

report_results
