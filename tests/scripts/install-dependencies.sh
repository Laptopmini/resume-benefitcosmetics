#!/bin/bash
set -e

# Install dependencies task — verify Next.js, React, Tailwind, etc. are installed

REQUIRED_PACKAGES=(
  "next@^15"
  "react@^19"
  "react-dom@^19"
  "framer-motion@^11"
  "tailwindcss@^4"
  "@tailwindcss/postcss@^4"
  "postcss@^8"
  "@types/react@^19"
  "@types/react-dom@^19"
  "@types/node@^22"
)

MISSING=""

for pkg in "${REQUIRED_PACKAGES[@]}"; do
  name="${pkg%@*}"
  if [ ! -d "node_modules/$name" ]; then
    MISSING="$MISSING $name"
  fi
done

if [ -n "$MISSING" ]; then
  echo "FAIL: Missing packages:$MISSING"
  exit 1
fi

# Verify package.json has the required scripts
for script in dev build start; do
  if ! grep -q "\"$script\"" package.json; then
    echo "FAIL: package.json missing script: $script"
    exit 1
  fi
done

echo "PASS: All required dependencies are installed"
exit 0