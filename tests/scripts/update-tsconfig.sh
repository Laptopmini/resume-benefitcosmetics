#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="tsconfig.json"

assert "tsconfig.json exists" test -f "$CFG"

# compilerOptions
assert_json "target ES2022" '_.compilerOptions.target === "ES2022"' "$CFG"
assert_json "module ESNext" '_.compilerOptions.module === "ESNext"' "$CFG"
assert_json "moduleResolution Bundler" '_.compilerOptions.moduleResolution === "Bundler"' "$CFG"
assert_json "jsx preserve" '_.compilerOptions.jsx === "preserve"' "$CFG"
assert_json "lib includes DOM" '_.compilerOptions.lib.includes("DOM")' "$CFG"
assert_json "lib includes DOM.Iterable" '_.compilerOptions.lib.includes("DOM.Iterable")' "$CFG"
assert_json "lib includes ES2022" '_.compilerOptions.lib.includes("ES2022")' "$CFG"
assert_json "strict true" "_.compilerOptions.strict === true" "$CFG"
assert_json "esModuleInterop true" "_.compilerOptions.esModuleInterop === true" "$CFG"
assert_json "skipLibCheck true" "_.compilerOptions.skipLibCheck === true" "$CFG"
assert_json "forceConsistentCasingInFileNames true" "_.compilerOptions.forceConsistentCasingInFileNames === true" "$CFG"
assert_json "allowJs false" "_.compilerOptions.allowJs === false" "$CFG"
assert_json "noEmit true" "_.compilerOptions.noEmit === true" "$CFG"
assert_json "incremental true" "_.compilerOptions.incremental === true" "$CFG"
assert_json "resolveJsonModule true" "_.compilerOptions.resolveJsonModule === true" "$CFG"
assert_json "isolatedModules true" "_.compilerOptions.isolatedModules === true" "$CFG"
assert_json "types includes jest" '_.compilerOptions.types.includes("jest")' "$CFG"
assert_json "types includes node" '_.compilerOptions.types.includes("node")' "$CFG"
assert_json "baseUrl is ." '_.compilerOptions.baseUrl === "."' "$CFG"
assert_json "paths @/* maps to src/*" '_.compilerOptions.paths["@/*"][0] === "src/*"' "$CFG"
assert_json "next plugin" '_.compilerOptions.plugins[0].name === "next"' "$CFG"

# No outDir or rootDir
assert_json "no outDir" "_.compilerOptions.outDir === undefined" "$CFG"
assert_json "no rootDir" "_.compilerOptions.rootDir === undefined" "$CFG"

# include
assert_json "include next-env.d.ts" '_.include.includes("next-env.d.ts")' "$CFG"
assert_json "include types/**/*.d.ts" '_.include.includes("types/**/*.d.ts")' "$CFG"
assert_json "include src/**/*.ts" '_.include.includes("src/**/*.ts")' "$CFG"
assert_json "include src/**/*.tsx" '_.include.includes("src/**/*.tsx")' "$CFG"

# exclude
assert_json "exclude node_modules" '_.exclude.includes("node_modules")' "$CFG"
assert_json "exclude .next" '_.exclude.includes(".next")' "$CFG"
assert_json "exclude out" '_.exclude.includes("out")' "$CFG"
assert_json "exclude dist" '_.exclude.includes("dist")' "$CFG"
assert_json "exclude tests" '_.exclude.includes("tests")' "$CFG"

report_results
