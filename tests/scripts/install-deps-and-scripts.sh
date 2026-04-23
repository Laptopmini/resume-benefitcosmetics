#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    echo "  PASS: $desc"
    ((PASS++))
  else
    echo "  FAIL: $desc"
    ((FAIL++))
  fi
}

PKG="package.json"

echo "=== Task: Install dependencies and update scripts ==="

# Production dependencies
check "next is in dependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.dependencies || !pkg.dependencies['next']) process.exit(1);
"
check "react is in dependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.dependencies || !pkg.dependencies['react']) process.exit(1);
"
check "react-dom is in dependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.dependencies || !pkg.dependencies['react-dom']) process.exit(1);
"
check "framer-motion is in dependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.dependencies || !pkg.dependencies['framer-motion']) process.exit(1);
"

# Dev dependencies
check "tailwindcss is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['tailwindcss']) process.exit(1);
"
check "@tailwindcss/postcss is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['@tailwindcss/postcss']) process.exit(1);
"
check "postcss is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['postcss']) process.exit(1);
"
check "@types/react is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['@types/react']) process.exit(1);
"
check "@types/react-dom is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['@types/react-dom']) process.exit(1);
"
check "@types/node is in devDependencies" node -e "
  const pkg = require('./$PKG');
  if (!pkg.devDependencies || !pkg.devDependencies['@types/node']) process.exit(1);
"

# Scripts
check "dev script exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || pkg.scripts.dev !== 'next dev') process.exit(1);
"
check "build script exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || pkg.scripts.build !== 'next build') process.exit(1);
"
check "start script exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || pkg.scripts.start !== 'next start') process.exit(1);
"
check "test script still exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || !pkg.scripts.test) process.exit(1);
"
check "lint script still exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || !pkg.scripts.lint) process.exit(1);
"
check "check-types script still exists" node -e "
  const pkg = require('./$PKG');
  if (!pkg.scripts || !pkg.scripts['check-types']) process.exit(1);
"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
