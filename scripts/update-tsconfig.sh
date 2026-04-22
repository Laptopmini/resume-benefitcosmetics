#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TSC="$ROOT/tsconfig.json"
FAIL=0

check() {
  local label="$1" code="$2"
  if node -e "$code" 2>/dev/null; then
    echo "PASS: $label"
  else
    echo "FAIL: $label"
    FAIL=1
  fi
}

echo "=== Checking tsconfig.json ==="

check "module is esnext" \
  "const t=require('$TSC'); if(t.compilerOptions.module.toLowerCase()!=='esnext') process.exit(1)"

check "moduleResolution is bundler" \
  "const t=require('$TSC'); if(t.compilerOptions.moduleResolution.toLowerCase()!=='bundler') process.exit(1)"

check "jsx is preserve" \
  "const t=require('$TSC'); if(t.compilerOptions.jsx.toLowerCase()!=='preserve') process.exit(1)"

check "noEmit is true" \
  "const t=require('$TSC'); if(t.compilerOptions.noEmit!==true) process.exit(1)"

check "lib includes dom" \
  "const t=require('$TSC'); const l=t.compilerOptions.lib.map(s=>s.toLowerCase()); if(!l.includes('dom')) process.exit(1)"

check "lib includes dom.iterable" \
  "const t=require('$TSC'); const l=t.compilerOptions.lib.map(s=>s.toLowerCase()); if(!l.includes('dom.iterable')) process.exit(1)"

check "lib includes esnext" \
  "const t=require('$TSC'); const l=t.compilerOptions.lib.map(s=>s.toLowerCase()); if(!l.includes('esnext')) process.exit(1)"

check "plugins includes next" \
  "const t=require('$TSC'); if(!t.compilerOptions.plugins?.some(p=>p.name==='next')) process.exit(1)"

check "paths @/* maps to ./*" \
  "const t=require('$TSC'); const p=t.compilerOptions.paths?.['@/*']; if(!p||!p.includes('./*')) process.exit(1)"

check "include has next-env.d.ts" \
  "const t=require('$TSC'); if(!t.include.includes('next-env.d.ts')) process.exit(1)"

check "include has **/*.ts" \
  "const t=require('$TSC'); if(!t.include.includes('**/*.ts')) process.exit(1)"

check "include has **/*.tsx" \
  "const t=require('$TSC'); if(!t.include.includes('**/*.tsx')) process.exit(1)"

check "include has .next/types/**/*.ts" \
  "const t=require('$TSC'); if(!t.include.includes('.next/types/**/*.ts')) process.exit(1)"

check "exclude has node_modules" \
  "const t=require('$TSC'); if(!t.exclude.includes('node_modules')) process.exit(1)"

check "exclude has .next" \
  "const t=require('$TSC'); if(!t.exclude.includes('.next')) process.exit(1)"

check "exclude has dist" \
  "const t=require('$TSC'); if(!t.exclude.includes('dist')) process.exit(1)"

check "exclude has out" \
  "const t=require('$TSC'); if(!t.exclude.includes('out')) process.exit(1)"

echo ""
echo "=== Running tsc --noEmit ==="
cd "$ROOT" && npx tsc --noEmit

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "FAILED: Some tsconfig checks did not pass."
  exit 1
fi

echo ""
echo "All checks passed."
