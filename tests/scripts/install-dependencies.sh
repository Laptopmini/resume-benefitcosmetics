#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

# Install dependencies by running npm install next@^15 react@^19 react-dom@^19 framer-motion@^11
# and npm install -D tailwindcss@^4 @tailwindcss/postcss@^4 postcss@^8 @types/react@^19 @types/react-dom@^19 @types/node@^22
# Then update package.json scripts to add dev, build, start scripts

# Check that next is installed
assert_json "next is installed" "_.dependencies.next" "./package.json"

# Check that react is installed
assert_json "react is installed" "_.dependencies.react" "./package.json"

# Check that react-dom is installed
assert_json "react-dom is installed" "_.dependencies['react-dom']" "./package.json"

# Check that framer-motion is installed
assert_json "framer-motion is installed" "_.dependencies['framer-motion']" "./package.json"

# Check that tailwindcss is installed as dev dependency
assert_json "tailwindcss is installed as devDependency" "_.devDependencies.tailwindcss" "./package.json"

# Check that @tailwindcss/postcss is installed as dev dependency
assert_json "@tailwindcss/postcss is installed as devDependency" "_.devDependencies['@tailwindcss/postcss']" "./package.json"

# Check that postcss is installed as dev dependency
assert_json "postcss is installed as devDependency" "_.devDependencies.postcss" "./package.json"

# Check that @types/react is installed as dev dependency
assert_json "@types/react is installed as devDependency" "_.devDependencies['@types/react']" "./package.json"

# Check that @types/react-dom is installed as dev dependency
assert_json "@types/react-dom is installed as devDependency" "_.devDependencies['@types/react-dom']" "./package.json"

# Check that @types/node is installed as dev dependency
assert_json "@types/node is installed as devDependency" "_.devDependencies['@types/node']" "./package.json"

# Check that dev script exists
assert_grep "dev script exists in package.json" '"dev":' "./package.json"

# Check that build script exists
assert_grep "build script exists in package.json" '"build":' "./package.json"

# Check that start script exists
assert_grep "start script exists in package.json" '"start":' "./package.json"

report_results
