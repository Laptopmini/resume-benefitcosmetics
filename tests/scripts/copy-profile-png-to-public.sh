#!/bin/bash
set -e

# Verify public/profile.png exists
if [ ! -f "public/profile.png" ]; then
  echo "FAIL: public/profile.png does not exist"
  exit 1
fi

# Verify public/.nojekyll exists
if [ ! -f "public/.nojekyll" ]; then
  echo "FAIL: public/.nojekyll does not exist"
  exit 1
fi

# Verify it's not empty (should have content or just be a marker file)
if [ ! -s "public/.nojekyll" ] && [ -f "public/.nojekyll" ]; then
  echo "PASS: public/.nojekyll exists (empty marker file is acceptable)"
  exit 0
fi

echo "PASS: profile.png copied to public and .nojekyll created"