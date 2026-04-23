#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

check() {
  local desc="$1"
  shift
  if "$@" > /dev/null 2>&1; then
    echo "  PASS: $desc"
    ((PASS++))
  else
    echo "  FAIL: $desc"
    ((FAIL++))
  fi
}

echo "=== Task: Update TypeScript configuration for Next.js ==="

check "module is esnext" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (ts.compilerOptions.module.toLowerCase() !== 'esnext') process.exit(1);
"

check "moduleResolution is bundler" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (ts.compilerOptions.moduleResolution.toLowerCase() !== 'bundler') process.exit(1);
"

check "jsx is preserve" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (ts.compilerOptions.jsx.toLowerCase() !== 'preserve') process.exit(1);
"

check "noEmit is true" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (ts.compilerOptions.noEmit !== true) process.exit(1);
"

check "lib includes dom, dom.iterable, esnext" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  const lib = (ts.compilerOptions.lib || []).map(l => l.toLowerCase());
  if (!lib.includes('dom') || !lib.includes('dom.iterable') || !lib.includes('esnext')) process.exit(1);
"

check "plugins include next" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  const plugins = ts.compilerOptions.plugins || [];
  if (!plugins.some(p => p.name === 'next')) process.exit(1);
"

check "paths has @/* alias" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  const paths = ts.compilerOptions.paths || {};
  if (!paths['@/*'] || !paths['@/*'].includes('./*')) process.exit(1);
"

check "include has next-env.d.ts" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.include || !ts.include.includes('next-env.d.ts')) process.exit(1);
"

check "include has **/*.ts" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.include || !ts.include.includes('**/*.ts')) process.exit(1);
"

check "include has **/*.tsx" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.include || !ts.include.includes('**/*.tsx')) process.exit(1);
"

check "include has .next/types/**/*.ts" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.include || !ts.include.includes('.next/types/**/*.ts')) process.exit(1);
"

check "exclude has node_modules" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.exclude || !ts.exclude.includes('node_modules')) process.exit(1);
"

check "exclude has .next" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.exclude || !ts.exclude.includes('.next')) process.exit(1);
"

check "exclude has dist" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.exclude || !ts.exclude.includes('dist')) process.exit(1);
"

check "exclude has out" node -e "
  const ts = JSON.parse(require('fs').readFileSync('tsconfig.json','utf8'));
  if (!ts.exclude || !ts.exclude.includes('out')) process.exit(1);
"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
