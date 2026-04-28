#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

assert "next.config.mjs exists" test -f "next.config.mjs"

# Use node to evaluate the ESM file
assert "next.config.mjs exports output: 'export'" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.output !== 'export') throw new Error('output mismatch');
}).catch(() => { throw new Error('cannot import'); })
"
assert "next.config.mjs exports basePath '/ralph-node-resume'" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.basePath !== '/ralph-node-resume') throw new Error('basePath mismatch');
}).catch(() => { throw new Error('cannot import'); })
"
assert "next.config.mjs exports assetPrefix '/ralph-node-resume'" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.assetPrefix !== '/ralph-node-resume') throw new Error('assetPrefix mismatch');
}).catch(() => { throw new Error('cannot import'); })
"
assert "next.config.mjs exports images.unoptimized true" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.images?.unoptimized !== true) throw new Error('images.unoptimized mismatch');
}).catch(() => { throw new Error('cannot import'); })
"
assert "next.config.mjs exports trailingSlash true" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.trailingSlash !== true) throw new Error('trailingSlash mismatch');
}).catch(() => { throw new Error('cannot import'); })
"
assert "next.config.mjs exports reactStrictMode true" node -e "
import('./next.config.mjs').then(m => {
  if (m.default.reactStrictMode !== true) throw new Error('reactStrictMode mismatch');
}).catch(() => { throw new Error('cannot import'); })
"

report_results