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
assert_json "tailwindcss v4 is installed" "_.devDependencies?.tailwindcss" "$PKG"
assert_json "@tailwindcss/postcss is installed" "_.devDependencies?.['@tailwindcss/postcss']" "$PKG"
assert_json "postcss is installed" "_.devDependencies?.postcss" "$PKG"
assert_json "@types/react is installed" "_.devDependencies?.['@types/react']" "$PKG"
assert_json "@types/react-dom is installed" "_.devDependencies?.['@types/react-dom']" "$PKG"
assert_json "@types/node is installed" "_.devDependencies?.['@types/node']" "$PKG"

# Scripts
assert_json "dev script exists" "_.scripts?.dev === 'next dev'" "$PKG"
assert_json "build script exists" "_.scripts?.build === 'next build'" "$PKG"
assert_json "start script exists" "_.scripts?.start === 'next start'" "$PKG"
assert_json "test script still exists" "_.scripts?.test" "$PKG"
assert_json "lint script still exists" "_.scripts?.lint" "$PKG"
assert_json "check-types script still exists" "_.scripts?.['check-types']" "$PKG"

# Verify modules are actually installed on disk
assert "next module exists on disk" test -d ./node_modules/next
assert "framer-motion module exists on disk" test -d ./node_modules/framer-motion

report_results
