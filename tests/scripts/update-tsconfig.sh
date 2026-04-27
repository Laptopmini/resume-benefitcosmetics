#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

TSC="./tsconfig.json"

assert "tsconfig.json exists" test -f "$TSC"

# Compiler options
assert_json "module is esnext" "_.compilerOptions.module.toLowerCase() === 'esnext'" "$TSC"
assert_json "moduleResolution is bundler" "_.compilerOptions.moduleResolution.toLowerCase() === 'bundler'" "$TSC"
assert_json "jsx is preserve" "_.compilerOptions.jsx.toLowerCase() === 'preserve'" "$TSC"
assert_json "noEmit is true" "_.compilerOptions.noEmit === true" "$TSC"
assert_json "lib includes dom" "_.compilerOptions.lib.some(l => l.toLowerCase() === 'dom')" "$TSC"
assert_json "lib includes dom.iterable" "_.compilerOptions.lib.some(l => l.toLowerCase() === 'dom.iterable')" "$TSC"
assert_json "lib includes esnext" "_.compilerOptions.lib.some(l => l.toLowerCase() === 'esnext')" "$TSC"
assert_json "next plugin configured" "_.compilerOptions.plugins?.some(p => p.name === 'next')" "$TSC"
assert_json "paths @/* configured" "_.compilerOptions.paths?.['@/*']?.[0] === './*'" "$TSC"

# Include
assert_json "include has next-env.d.ts" "_.include.includes('next-env.d.ts')" "$TSC"
assert_json "include has **/*.ts" "_.include.includes('**/*.ts')" "$TSC"
assert_json "include has **/*.tsx" "_.include.includes('**/*.tsx')" "$TSC"
assert_json "include has .next/types/**/*.ts" "_.include.includes('.next/types/**/*.ts')" "$TSC"

# Exclude
assert_json "exclude has node_modules" "_.exclude.includes('node_modules')" "$TSC"
assert_json "exclude has .next" "_.exclude.includes('.next')" "$TSC"
assert_json "exclude has dist" "_.exclude.includes('dist')" "$TSC"
assert_json "exclude has out" "_.exclude.includes('out')" "$TSC"

report_results
