#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PKG="$ROOT/package.json"

fail() { echo "FAIL: $1" >&2; exit 1; }

# Check runtime dependencies exist in node_modules
for dep in next react react-dom framer-motion; do
  [ -d "$ROOT/node_modules/$dep" ] || fail "$dep not installed"
done

# Check devDependencies exist in node_modules
for dep in tailwindcss @tailwindcss/postcss postcss @types/react @types/react-dom @types/node; do
  [ -d "$ROOT/node_modules/$dep" ] || fail "$dep not installed"
done

# Check dependencies are listed in package.json
node -e "
const pkg = require('$PKG');
const deps = pkg.dependencies || {};
const devDeps = pkg.devDependencies || {};

const required = { 'next': '^15', 'react': '^19', 'react-dom': '^19', 'framer-motion': '^11' };
for (const [name, range] of Object.entries(required)) {
  if (!deps[name]) { console.error('Missing dependency: ' + name); process.exit(1); }
}

const requiredDev = {
  'tailwindcss': '^4', '@tailwindcss/postcss': '^4', 'postcss': '^8',
  '@types/react': '^19', '@types/react-dom': '^19', '@types/node': '^22'
};
for (const [name, range] of Object.entries(requiredDev)) {
  if (!devDeps[name]) { console.error('Missing devDependency: ' + name); process.exit(1); }
}
" || fail "package.json missing required dependencies"

# Check scripts
node -e "
const pkg = require('$PKG');
const scripts = pkg.scripts || {};
if (scripts.dev !== 'next dev') { console.error('dev script wrong'); process.exit(1); }
if (scripts.build !== 'next build') { console.error('build script wrong'); process.exit(1); }
if (scripts.start !== 'next start') { console.error('start script wrong'); process.exit(1); }
if (!scripts.test) { console.error('test script missing'); process.exit(1); }
if (!scripts.lint) { console.error('lint script missing'); process.exit(1); }
if (!scripts['check-types']) { console.error('check-types script missing'); process.exit(1); }
" || fail "package.json scripts incorrect"

echo "PASS: install-dependencies"
