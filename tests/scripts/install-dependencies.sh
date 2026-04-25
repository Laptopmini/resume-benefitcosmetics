#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

assert() {
  local desc="$1"
  shift
  if "$@" >/dev/null 2>&1; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

assert_json() {
  local desc="$1"
  local query="$2"
  if node -e "const p=require('./package.json'); if(!($query)) process.exit(1);" 2>/dev/null; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

# Check production dependencies exist
assert_json "next is in dependencies" "p.dependencies && p.dependencies['next']"
assert_json "react is in dependencies" "p.dependencies && p.dependencies['react']"
assert_json "react-dom is in dependencies" "p.dependencies && p.dependencies['react-dom']"
assert_json "framer-motion is in dependencies" "p.dependencies && p.dependencies['framer-motion']"

# Check devDependencies
assert_json "tailwindcss is in devDependencies" "p.devDependencies && p.devDependencies['tailwindcss']"
assert_json "@tailwindcss/postcss is in devDependencies" "p.devDependencies && p.devDependencies['@tailwindcss/postcss']"
assert_json "postcss is in devDependencies" "p.devDependencies && p.devDependencies['postcss']"
assert_json "@types/react is in devDependencies" "p.devDependencies && p.devDependencies['@types/react']"
assert_json "@types/react-dom is in devDependencies" "p.devDependencies && p.devDependencies['@types/react-dom']"
assert_json "@types/node is in devDependencies" "p.devDependencies && p.devDependencies['@types/node']"

# Check scripts
assert_json "dev script exists" "p.scripts && p.scripts.dev === 'next dev'"
assert_json "build script exists" "p.scripts && p.scripts.build === 'next build'"
assert_json "start script exists" "p.scripts && p.scripts.start === 'next start'"
assert_json "test script still exists" "p.scripts && p.scripts.test"
assert_json "lint script still exists" "p.scripts && p.scripts.lint"
assert_json "check-types script still exists" "p.scripts && p.scripts['check-types']"

# Check that modules are actually installed (resolvable)
assert "next is resolvable" node -e "require.resolve('next')"
assert "react is resolvable" node -e "require.resolve('react')"
assert "react-dom is resolvable" node -e "require.resolve('react-dom')"
assert "framer-motion is resolvable" node -e "require.resolve('framer-motion')"
assert "tailwindcss is resolvable" node -e "require.resolve('tailwindcss')"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
