#!/bin/bash
set -e

# Verify Next.js packages are installed
if [ ! -d "node_modules/next" ]; then
  echo "FAIL: next is not installed"
  exit 1
fi

if [ ! -d "node_modules/react" ]; then
  echo "FAIL: react is not installed"
  exit 1
fi

if [ ! -d "node_modules/react-dom" ]; then
  echo "FAIL: react-dom is not installed"
  exit 1
fi

if [ ! -d "node_modules/framer-motion" ]; then
  echo "FAIL: framer-motion is not installed"
  exit 1
fi

# Verify Tailwind v4 packages are installed
if [ ! -d "node_modules/tailwindcss" ]; then
  echo "FAIL: tailwindcss is not installed"
  exit 1
fi

if [ ! -d "node_modules/@tailwindcss/postcss" ]; then
  echo "FAIL: @tailwindcss/postcss is not installed"
  exit 1
fi

if [ ! -d "node_modules/postcss" ]; then
  echo "FAIL: postcss is not installed"
  exit 1
fi

# Verify dev dependency packages are installed
if [ ! -d "node_modules/@types/react" ]; then
  echo "FAIL: @types/react is not installed"
  exit 1
fi

if [ ! -d "node_modules/@types/react-dom" ]; then
  echo "FAIL: @types/react-dom is not installed"
  exit 1
fi

if [ ! -d "node_modules/@types/node" ]; then
  echo "FAIL: @types/node is not installed"
  exit 1
fi

# Verify scripts in package.json
if ! grep -q '"dev": "next dev"' package.json; then
  echo "FAIL: dev script not found in package.json"
  exit 1
fi

if ! grep -q '"build": "next build"' package.json; then
  echo "FAIL: build script not found in package.json"
  exit 1
fi

if ! grep -q '"start": "next start"' package.json; then
  echo "FAIL: start script not found in package.json"
  exit 1
fi

# Verify existing scripts are intact
if ! grep -q '"test":' package.json; then
  echo "FAIL: test script removed from package.json"
  exit 1
fi

if ! grep -q '"lint":' package.json; then
  echo "FAIL: lint script removed from package.json"
  exit 1
fi

if ! grep -q '"check-types":' package.json; then
  echo "FAIL: check-types script removed from package.json"
  exit 1
fi

echo "PASS: All dependencies installed and scripts intact"