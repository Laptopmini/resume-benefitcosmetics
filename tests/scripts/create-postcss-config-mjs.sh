#!/bin/bash
set -e

if [ ! -f "postcss.config.mjs" ]; then
  echo "FAIL: postcss.config.mjs does not exist"
  exit 1
fi

# Verify @tailwindcss/postcss plugin is configured
if ! grep -q "@tailwindcss/postcss" postcss.config.mjs; then
  echo "FAIL: @tailwindcss/postcss plugin not found"
  exit 1
fi

echo "PASS: postcss.config.mjs created with tailwindcss/postcss plugin"