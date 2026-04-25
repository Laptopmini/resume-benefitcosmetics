#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

PKG="./package.json"

# Runtime dependencies
assert_json "next is installed" "_.dependencies?.next || _.devDependencies?.next" "$PKG"
assert_json "react is installed" "_.dependencies?.react || _.devDependencies?.react" "$PKG"
assert_json "react-dom is installed" "_.dependencies?.['react-dom'] || _.devDependencies?.['react-dom']" "$PKG"
assert_json "framer-motion is installed" "_.dependencies?.['framer-motion'] || _.devDependencies?.['framer-motion']" "$PKG"

# Dev dependencies
assert_json "tailwindcss is in devDependencies" "_.devDependencies?.tailwindcss" "$PKG"
assert_json "@tailwindcss/postcss is in devDependencies" "_.devDependencies?.['@tailwindcss/postcss']" "$PKG"
assert_json "postcss is in devDependencies" "_.devDependencies?.postcss" "$PKG"
assert_json "@types/react is in devDependencies" "_.devDependencies?.['@types/react']" "$PKG"
assert_json "@types/react-dom is in devDependencies" "_.devDependencies?.['@types/react-dom']" "$PKG"
assert_json "@types/node is in devDependencies" "_.devDependencies?.['@types/node']" "$PKG"

# Scripts
assert_json "dev script exists" "_.scripts?.dev === 'next dev'" "$PKG"
assert_json "build script exists" "_.scripts?.build === 'next build'" "$PKG"
assert_json "start script exists" "_.scripts?.start === 'next start'" "$PKG"

# Existing scripts preserved
assert_json "test script preserved" "_.scripts?.test && _.scripts.test.length > 0" "$PKG"
assert_json "lint script preserved" "_.scripts?.lint && _.scripts.lint.length > 0" "$PKG"
assert_json "check-types script preserved" "_.scripts?.['check-types'] && _.scripts['check-types'].length > 0" "$PKG"

# Verify node_modules actually contain the packages
assert "next binary exists" test -f ./node_modules/.bin/next
assert "react package exists" test -d ./node_modules/react
assert "react-dom package exists" test -d ./node_modules/react-dom
assert "framer-motion package exists" test -d ./node_modules/framer-motion
assert "tailwindcss package exists" test -d ./node_modules/tailwindcss

report_results
