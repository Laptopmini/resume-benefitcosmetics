#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

CFG="./next.config.mjs"

assert "next.config.mjs exists" test -f "$CFG"
assert_grep "output export" "export" "$CFG"
assert_grep "basePath set" "/ralph-node-resume" "$CFG"
assert_grep "assetPrefix set" "assetPrefix" "$CFG"
assert_grep "unoptimized images" "unoptimized" "$CFG"
assert_grep "trailingSlash" "trailingSlash" "$CFG"
assert_grep "reactStrictMode" "reactStrictMode" "$CFG"

check_config_values() {
  node -e "
    import('$CFG').then(m => {
      const c = m.default;
      const checks = [
        c.output === 'export',
        c.basePath === '/ralph-node-resume',
        c.assetPrefix === '/ralph-node-resume',
        c.images?.unoptimized === true,
        c.trailingSlash === true,
        c.reactStrictMode === true
      ];
      if (checks.every(Boolean)) process.exit(0);
      else process.exit(1);
    }).catch(() => process.exit(1));
  " 2>/dev/null
}

assert "config values are correct" check_config_values

report_results
