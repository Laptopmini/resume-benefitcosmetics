#!/bin/bash
set -e

# Update TypeScript config task — verify tsconfig.json has Next.js settings

if [ ! -f "tsconfig.json" ]; then
  echo "FAIL: tsconfig.json not found"
  exit 1
fi

# Check required Next.js settings
node -e "
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));

const checks = [
  ['module === esnext', cfg.module === 'esnext'],
  ['moduleResolution === bundler', cfg.moduleResolution === 'bundler'],
  ['jsx === preserve', cfg.jsx === 'preserve'],
  ['noEmit === true', cfg.noEmit === true],
  ['lib includes dom', cfg.lib && cfg.lib.includes('dom')],
  ['lib includes dom.iterable', cfg.lib && cfg.lib.includes('dom.iterable')],
  ['lib includes esnext', cfg.lib && cfg.lib.includes('esnext')],
  ['plugins with name next', cfg.plugins && cfg.plugins.some(p => p.name === 'next')],
  ['paths @/*', cfg.paths && cfg.paths['@/*']],
  ['include has next-env.d.ts', cfg.include && cfg.include.includes('next-env.d.ts')],
  ['include has **/*.ts', cfg.include && cfg.include.includes('**/*.ts')],
  ['include has **/*.tsx', cfg.include && cfg.include.includes('**/*.tsx')],
  ['include has .next/types/**/*.ts', cfg.include && cfg.include.includes('.next/types/**/*.ts')],
  ['exclude has node_modules', cfg.exclude && cfg.exclude.includes('node_modules')],
  ['exclude has .next', cfg.exclude && cfg.exclude.includes('.next')],
];

const failed = checks.filter(([,v]) => !v);
if (failed.length) {
  console.error('FAIL: Invalid tsconfig.json:');
  failed.forEach(([k]) => console.error('  - ' + k));
  process.exit(1);
}
console.log('PASS: tsconfig.json has all required Next.js settings');
"