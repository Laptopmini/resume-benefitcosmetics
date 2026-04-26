#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

PKG="./package.json"

# Runtime dependencies
assert_json "next is installed" "_.dependencies && _.dependencies.next" "$PKG"
assert_json "react is installed" "_.dependencies && _.dependencies.react" "$PKG"
assert_json "react-dom is installed" "_.dependencies && _.dependencies['react-dom']" "$PKG"
assert_json "framer-motion is installed" "_.dependencies && _.dependencies['framer-motion']" "$PKG"

# Dev dependencies
assert_json "tailwindcss is a devDep" "_.devDependencies && _.devDependencies.tailwindcss" "$PKG"
assert_json "@tailwindcss/postcss is a devDep" "_.devDependencies && _.devDependencies['@tailwindcss/postcss']" "$PKG"
assert_json "postcss is a devDep" "_.devDependencies && _.devDependencies.postcss" "$PKG"
assert_json "@types/react is a devDep" "_.devDependencies && _.devDependencies['@types/react']" "$PKG"
assert_json "@types/react-dom is a devDep" "_.devDependencies && _.devDependencies['@types/react-dom']" "$PKG"
assert_json "@types/node is a devDep" "_.devDependencies && _.devDependencies['@types/node']" "$PKG"

# Scripts
assert_json "dev script exists" "_.scripts && _.scripts.dev === 'next dev'" "$PKG"
assert_json "build script exists" "_.scripts && _.scripts.build === 'next build'" "$PKG"
assert_json "start script exists" "_.scripts && _.scripts.start === 'next start'" "$PKG"
assert_json "test script still exists" "_.scripts && _.scripts.test" "$PKG"
assert_json "lint script still exists" "_.scripts && _.scripts.lint" "$PKG"
assert_json "check-types script still exists" "_.scripts && _.scripts['check-types']" "$PKG"

report_results
