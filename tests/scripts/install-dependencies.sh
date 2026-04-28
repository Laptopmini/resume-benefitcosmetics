#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Verify dependencies are installed
assert "next is installed" node -e "require('next/package.json')"
assert "react is installed" node -e "require('react/package.json')"
assert "react-dom is installed" node -e "require('react-dom/package.json')"
assert "framer-motion is installed" node -e "require('framer-motion/package.json')"
assert "tailwindcss is installed as dev dep" node -e "const p=require('tailwindcss/package.json'); if(!p.devDependency) process.exit(1)"
assert "@tailwindcss/postcss is installed as dev dep" node -e "const p=require('@tailwindcss/postcss/package.json'); if(!p.devDependency) process.exit(1)"
assert "postcss is installed as dev dep" node -e "const p=require('postcss/package.json'); if(!p.devDependency) process.exit(1)"
assert "@types/react is installed as dev dep" node -e "const p=require('@types/react/package.json'); if(!p.devDependency) process.exit(1)"
assert "@types/react-dom is installed as dev dep" node -e "const p=require('@types/react-dom/package.json'); if(!p.devDependency) process.exit(1)"
assert "@types/node is installed as dev dep" node -e "const p=require('@types/node/package.json'); if(!p.devDependency) process.exit(1)"

# Verify scripts
assert_json "has dev script" "_.scripts.dev === 'next dev'" "./package.json"
assert_json "has build script" "_.scripts.build === 'next build'" "./package.json"
assert_json "has start script" "_.scripts.start === 'next start'" "./package.json"
assert_json "has test script" "_.scripts.test" "./package.json"
assert_json "has lint script" "_.scripts.lint" "./package.json"
assert_json "has check-types script" "_.scripts['check-types']" "./package.json"

report_results