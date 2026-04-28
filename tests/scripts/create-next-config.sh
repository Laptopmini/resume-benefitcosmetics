#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CONFIG="next.config.mjs"

assert "next.config.mjs exists" test -f "$CONFIG"
assert_grep "has export default" "export default" "$CONFIG"
assert_grep "output export" "export" "$CONFIG"
assert_grep "basePath" "/ralph-node-resume" "$CONFIG"
assert_grep "assetPrefix" "assetPrefix" "$CONFIG"
assert_grep "images unoptimized" "unoptimized" "$CONFIG"
assert_grep "trailingSlash" "trailingSlash" "$CONFIG"
assert_grep "reactStrictMode" "reactStrictMode" "$CONFIG"

# Validate via node import
assert "config loads and has correct output" node -e "
  import('./next.config.mjs').then(m => {
    const c = m.default;
    if (c.output !== 'export') process.exit(1);
    if (c.basePath !== '/ralph-node-resume') process.exit(1);
    if (c.assetPrefix !== '/ralph-node-resume') process.exit(1);
    if (c.images?.unoptimized !== true) process.exit(1);
    if (c.trailingSlash !== true) process.exit(1);
    if (c.reactStrictMode !== true) process.exit(1);
  });
"

report_results
