#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TSCONFIG="$ROOT/tsconfig.json"

fail() { echo "FAIL: $1" >&2; exit 1; }

[ -f "$TSCONFIG" ] || fail "tsconfig.json not found"

node -e "
const ts = require('$TSCONFIG');
const co = ts.compilerOptions || {};

if (co.module !== 'esnext' && co.module !== 'ESNext') { console.error('module should be esnext, got: ' + co.module); process.exit(1); }
if (co.moduleResolution !== 'bundler' && co.moduleResolution !== 'Bundler') { console.error('moduleResolution should be bundler, got: ' + co.moduleResolution); process.exit(1); }
if (co.jsx !== 'preserve') { console.error('jsx should be preserve, got: ' + co.jsx); process.exit(1); }
if (co.noEmit !== true) { console.error('noEmit should be true'); process.exit(1); }

const lib = (co.lib || []).map(l => l.toLowerCase());
if (!lib.includes('dom')) { console.error('lib missing dom'); process.exit(1); }
if (!lib.includes('dom.iterable')) { console.error('lib missing dom.iterable'); process.exit(1); }
if (!lib.includes('esnext')) { console.error('lib missing esnext'); process.exit(1); }

const plugins = co.plugins || [];
const hasNext = plugins.some(p => p.name === 'next');
if (!hasNext) { console.error('plugins missing next'); process.exit(1); }

const paths = co.paths || {};
if (!paths['@/*'] || !paths['@/*'].includes('./*')) { console.error('paths @/* missing'); process.exit(1); }

const inc = ts.include || [];
if (!inc.includes('next-env.d.ts')) { console.error('include missing next-env.d.ts'); process.exit(1); }
if (!inc.some(i => i.includes('.next/types'))) { console.error('include missing .next/types/**/*.ts'); process.exit(1); }

const exc = ts.exclude || [];
if (!exc.includes('node_modules')) { console.error('exclude missing node_modules'); process.exit(1); }
if (!exc.includes('.next')) { console.error('exclude missing .next'); process.exit(1); }
if (!exc.includes('dist')) { console.error('exclude missing dist'); process.exit(1); }
if (!exc.includes('out')) { console.error('exclude missing out'); process.exit(1); }
" || fail "tsconfig.json configuration incorrect"

echo "PASS: update-tsconfig"
