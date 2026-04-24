#!/bin/bash
set -e

if [ ! -f "tsconfig.json" ]; then
  echo "FAIL: tsconfig.json does not exist"
  exit 1
fi

# Verify required Next.js settings
if ! grep -q '"module": "esnext"' tsconfig.json; then
  echo "FAIL: module is not set to esnext"
  exit 1
fi

if ! grep -q '"moduleResolution": "bundler"' tsconfig.json; then
  echo "FAIL: moduleResolution is not set to bundler"
  exit 1
fi

if ! grep -q '"jsx": "preserve"' tsconfig.json; then
  echo "FAIL: jsx is not set to preserve"
  exit 1
fi

if ! grep -q '"noEmit": true' tsconfig.json; then
  echo "FAIL: noEmit is not set to true"
  exit 1
fi

if ! grep -q '"lib"' tsconfig.json; then
  echo "FAIL: lib is not defined"
  exit 1
fi

if ! grep -q '"plugins"' tsconfig.json; then
  echo "FAIL: plugins is not defined"
  exit 1
fi

if ! grep -q '"paths"' tsconfig.json; then
  echo "FAIL: paths is not defined"
  exit 1
fi

if ! grep -q '"@/\*"' tsconfig.json; then
  echo "FAIL: paths @/* is not configured"
  exit 1
fi

# Verify include contains required patterns
if ! grep -q 'next-env.d.ts' tsconfig.json; then
  echo "FAIL: next-env.d.ts not in include"
  exit 1
fi

if ! grep -q '.next/types' tsconfig.json; then
  echo "FAIL: .next/types/**/*.ts not in include"
  exit 1
fi

# Verify exclude is intact
if ! grep -q 'node_modules' tsconfig.json; then
  echo "FAIL: node_modules not in exclude"
  exit 1
fi

echo "PASS: tsconfig.json updated correctly for Next.js"