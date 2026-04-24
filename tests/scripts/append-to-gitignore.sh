#!/bin/bash
set -e

if [ ! -f ".gitignore" ]; then
  echo "FAIL: .gitignore does not exist"
  exit 1
fi

# Verify .next/ is in gitignore
if ! grep -q '\.next/' .gitignore; then
  echo "FAIL: .next/ not appended to .gitignore"
  exit 1
fi

# Verify out/ is in gitignore
if ! grep -q '^out/$' .gitignore; then
  echo "FAIL: out/ not appended to .gitignore"
  exit 1
fi

# Verify next-env.d.ts is in gitignore
if ! grep -q 'next-env.d.ts' .gitignore; then
  echo "FAIL: next-env.d.ts not appended to .gitignore"
  exit 1
fi

echo "PASS: .gitignore updated with Next.js entries"