#!/usr/bin/env bash
set -euo pipefail

PASS=0
FAIL=0

assert_json() {
  local desc="$1"
  local query="$2"
  if node -e "const t=require('./tsconfig.json'); if(!($query)) process.exit(1);" 2>/dev/null; then
    echo "PASS: $desc"
    ((PASS++))
  else
    echo "FAIL: $desc"
    ((FAIL++))
  fi
}

CO="t.compilerOptions"

assert_json "module is esnext" "$CO.module && $CO.module.toLowerCase() === 'esnext'"
assert_json "moduleResolution is bundler" "$CO.moduleResolution && $CO.moduleResolution.toLowerCase() === 'bundler'"
assert_json "jsx is preserve" "$CO.jsx && $CO.jsx.toLowerCase() === 'preserve'"
assert_json "noEmit is true" "$CO.noEmit === true"
assert_json "lib includes dom" "$CO.lib && $CO.lib.map(l=>l.toLowerCase()).includes('dom')"
assert_json "lib includes dom.iterable" "$CO.lib && $CO.lib.map(l=>l.toLowerCase()).includes('dom.iterable')"
assert_json "lib includes esnext" "$CO.lib && $CO.lib.map(l=>l.toLowerCase()).includes('esnext')"
assert_json "next plugin configured" "$CO.plugins && $CO.plugins.some(p=>p.name==='next')"
assert_json "paths @/* configured" "$CO.paths && $CO.paths['@/*'] && $CO.paths['@/*'].includes('./*')"
assert_json "include has next-env.d.ts" "t.include && t.include.includes('next-env.d.ts')"
assert_json "include has **/*.ts" "t.include && t.include.includes('**/*.ts')"
assert_json "include has **/*.tsx" "t.include && t.include.includes('**/*.tsx')"
assert_json "include has .next/types/**/*.ts" "t.include && t.include.includes('.next/types/**/*.ts')"
assert_json "exclude has node_modules" "t.exclude && t.exclude.includes('node_modules')"
assert_json "exclude has .next" "t.exclude && t.exclude.includes('.next')"
assert_json "exclude has dist" "t.exclude && t.exclude.includes('dist')"
assert_json "exclude has out" "t.exclude && t.exclude.includes('out')"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] || exit 1
