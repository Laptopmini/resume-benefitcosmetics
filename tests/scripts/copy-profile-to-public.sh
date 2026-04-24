#!/bin/bash
set -e

# Copy profile to public task — verify public/profile.png exists and public/.nojekyll exists

PROFILE_MISSING=0
NOJEKYLL_MISSING=0

if [ ! -f "public/profile.png" ]; then
  echo "FAIL: public/profile.png not found"
  PROFILE_MISSING=1
fi

if [ ! -f "public/.nojekyll" ]; then
  echo "FAIL: public/.nojekyll not found"
  NOJEKYLL_MISSING=1
fi

if [ $PROFILE_MISSING -eq 1 ] || [ $NOJEKYLL_MISSING -eq 1 ]; then
  exit 1
fi

echo "PASS: public/profile.png and public/.nojekyll exist"
exit 0