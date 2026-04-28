#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="jest.config.mjs"

assert "jest.config.mjs exists" test -f "$CFG"
assert_grep "testEnvironment jsdom" "jsdom" "$CFG"
assert_grep "moduleNameMapper @/ alias" '"^@/(.*)$"' "$CFG"
assert_grep "css mock mapping" "styleMock" "$CFG"
assert_grep "setupFilesAfterEnv" "jest.setup" "$CFG"

# Helper files
assert "styleMock.js exists" test -f tests/helpers/styleMock.js
assert_grep "styleMock exports empty object" "module.exports" "tests/helpers/styleMock.js"

assert "jest.setup.ts exists" test -f tests/helpers/jest.setup.ts
assert_grep "jest.setup imports jest-dom" "@testing-library/jest-dom" "tests/helpers/jest.setup.ts"

report_results
