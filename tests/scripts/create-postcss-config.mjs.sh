#!/bin/bash
set -e

# Create postcss.config.mjs task — verify file and @tailwindcss/postcss plugin

if [ ! -f "postcss.config.mjs" ]; then
  echo "FAIL: postcss.config.mjs not found"
  exit 1
fi

node -e "
const fs = require('fs');
const code = fs.readFileSync('postcss.config.mjs', 'utf8');

if (!code.includes('@tailwindcss/postcss')) {
  console.error('FAIL: postcss.config.mjs missing @tailwindcss/postcss plugin');
  process.exit(1);
}
console.log('PASS: postcss.config.mjs has @tailwindcss/postcss plugin');
"