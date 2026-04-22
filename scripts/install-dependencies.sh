#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PKG="$ROOT/package.json"
FAIL=0

assert_json() {
  local query="$1" expected="$2" label="$3"
  actual=$(node -e "const p=require('$PKG'); const v=$query; process.stdout.write(String(v ?? ''))")
  if [ "$actual" != "$expected" ]; then
    echo "FAIL: $label — expected '$expected', got '$actual'"
    FAIL=1
  else
    echo "PASS: $label"
  fi
}

assert_dep() {
  local name="$1" field="$2"
  local val
  val=$(node -e "const p=require('$PKG'); process.stdout.write(p.$field?.['$name'] ?? '')")
  if [ -z "$val" ]; then
    echo "FAIL: $name missing from $field"
    FAIL=1
  else
    echo "PASS: $name in $field ($val)"
  fi
}

echo "=== Checking dependencies ==="
assert_dep "next" "dependencies"
assert_dep "react" "dependencies"
assert_dep "react-dom" "dependencies"
assert_dep "framer-motion" "dependencies"

echo ""
echo "=== Checking devDependencies ==="
assert_dep "tailwindcss" "devDependencies"
assert_dep "@tailwindcss/postcss" "devDependencies"
assert_dep "postcss" "devDependencies"
assert_dep "@types/react" "devDependencies"
assert_dep "@types/react-dom" "devDependencies"
assert_dep "@types/node" "devDependencies"

echo ""
echo "=== Checking scripts ==="
assert_json "p.scripts?.dev" "next dev" "scripts.dev"
assert_json "p.scripts?.build" "next build" "scripts.build"
assert_json "p.scripts?.start" "next start" "scripts.start"

# Existing scripts must still be present
node -e "const p=require('$PKG'); if(!p.scripts?.test) { process.exit(1) }" || { echo "FAIL: scripts.test missing"; FAIL=1; }
echo "PASS: scripts.test exists"
node -e "const p=require('$PKG'); if(!p.scripts?.lint) { process.exit(1) }" || { echo "FAIL: scripts.lint missing"; FAIL=1; }
echo "PASS: scripts.lint exists"
node -e "const p=require('$PKG'); if(!p.scripts?.['check-types']) { process.exit(1) }" || { echo "FAIL: scripts.check-types missing"; FAIL=1; }
echo "PASS: scripts.check-types exists"

echo ""
echo "=== Running biome check ==="
npx biome check "$ROOT"

if [ "$FAIL" -ne 0 ]; then
  echo ""
  echo "FAILED: Some checks did not pass."
  exit 1
fi

echo ""
echo "All checks passed."
