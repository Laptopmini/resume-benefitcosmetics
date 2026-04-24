#!/bin/bash
set -e

# Create next.config.mjs task — verify file and required exports

if [ ! -f "next.config.mjs" ]; then
  echo "FAIL: next.config.mjs not found"
  exit 1
fi

node -e "
const fs = require('fs');
const code = fs.readFileSync('next.config.mjs', 'utf8');

// Check for required config properties
const required = [
  'output.*export',
  'basePath.*ralph-node-resume',
  'assetPrefix.*ralph-node-resume',
  'images.*unoptimized.*true',
  'trailingSlash.*true',
  'reactStrictMode.*true',
];

const failed = required.filter(r => !new RegExp(r).test(code));
if (failed.length) {
  console.error('FAIL: next.config.mjs missing or invalid properties:');
  failed.forEach(r => console.error('  - ' + r));
  process.exit(1);
}
console.log('PASS: next.config.mjs has all required exports');
"