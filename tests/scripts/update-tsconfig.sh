#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

TSC="./tsconfig.json"

assert "tsconfig.json exists" test -f "$TSC"

assert_json "module is esnext" "_.compilerOptions.module.toLowerCase() === 'esnext'" "$TSC"
assert_json "moduleResolution is bundler" "_.compilerOptions.moduleResolution.toLowerCase() === 'bundler'" "$TSC"
assert_json "jsx is preserve" "_.compilerOptions.jsx === 'preserve'" "$TSC"
assert_json "noEmit is true" "_.compilerOptions.noEmit === true" "$TSC"
assert_json "lib includes dom" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.some(l => l.toLowerCase() === 'dom')" "$TSC"
assert_json "lib includes dom.iterable" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.some(l => l.toLowerCase() === 'dom.iterable')" "$TSC"
assert_json "lib includes esnext" "Array.isArray(_.compilerOptions.lib) && _.compilerOptions.lib.some(l => l.toLowerCase() === 'esnext')" "$TSC"
assert_json "next plugin configured" "Array.isArray(_.compilerOptions.plugins) && _.compilerOptions.plugins.some(p => p.name === 'next')" "$TSC"
assert_json "paths @/* configured" "_.compilerOptions.paths && _.compilerOptions.paths['@/*'] && _.compilerOptions.paths['@/*'].includes('./*')" "$TSC"
assert_json "include has next-env.d.ts" "Array.isArray(_.include) && _.include.includes('next-env.d.ts')" "$TSC"
assert_json "include has **/*.ts" "Array.isArray(_.include) && _.include.includes('**/*.ts')" "$TSC"
assert_json "include has **/*.tsx" "Array.isArray(_.include) && _.include.includes('**/*.tsx')" "$TSC"
assert_json "include has .next/types/**/*.ts" "Array.isArray(_.include) && _.include.includes('.next/types/**/*.ts')" "$TSC"
assert_json "exclude has node_modules" "Array.isArray(_.exclude) && _.exclude.includes('node_modules')" "$TSC"
assert_json "exclude has .next" "Array.isArray(_.exclude) && _.exclude.includes('.next')" "$TSC"
assert_json "exclude has dist" "Array.isArray(_.exclude) && _.exclude.includes('dist')" "$TSC"
assert_json "exclude has out" "Array.isArray(_.exclude) && _.exclude.includes('out')" "$TSC"

report_results
