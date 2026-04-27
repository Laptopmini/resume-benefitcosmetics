#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert_json "module is esnext" "_.compilerOptions.module === 'esnext'" "./tsconfig.json"
assert_json "moduleResolution is bundler" "_.compilerOptions.moduleResolution === 'bundler'" "./tsconfig.json"
assert_json "jsx is preserve" "_.compilerOptions.jsx === 'preserve'" "./tsconfig.json"
assert_json "noEmit is true" "_.compilerOptions.noEmit === true" "./tsconfig.json"
assert_json "lib includes dom" "_.compilerOptions.lib.includes('dom')" "./tsconfig.json"
assert_json "lib includes dom.iterable" "_.compilerOptions.lib.includes('dom.iterable')" "./tsconfig.json"
assert_json "lib includes esnext" "_.compilerOptions.lib.includes('esnext')" "./tsconfig.json"
assert_json "plugins includes next" "_.compilerOptions.plugins.some(p => p.name === 'next')" "./tsconfig.json"
assert_json "paths @/* is defined" "_.compilerOptions.paths['@/*']" "./tsconfig.json"
assert_json "include has next-env.d.ts" "_.include.includes('next-env.d.ts')" "./tsconfig.json"
assert_json "include has **/*.ts" "_.include.includes('**/*.ts')" "./tsconfig.json"
assert_json "include has **/*.tsx" "_.include.includes('**/*.tsx')" "./tsconfig.json"
assert_json "exclude has node_modules" "_.exclude.includes('node_modules')" "./tsconfig.json"
assert_json "exclude has .next" "_.exclude.includes('.next')" "./tsconfig.json"
assert_json "exclude has dist" "_.exclude.includes('dist')" "./tsconfig.json"
assert_json "exclude has out" "_.exclude.includes('out')" "./tsconfig.json"

report_results