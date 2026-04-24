#!/bin/bash
set -e

if [ ! -f "next.config.mjs" ]; then
  echo "FAIL: next.config.mjs does not exist"
  exit 1
fi

# Verify output: 'export'
if ! grep -q "output: ['\"]export['\"]" next.config.mjs; then
  echo "FAIL: output is not set to 'export'"
  exit 1
fi

# Verify basePath: '/ralph-node-resume'
if ! grep -q "basePath: ['\"]/ralph-node-resume['\"]" next.config.mjs; then
  echo "FAIL: basePath is not set to '/ralph-node-resume'"
  exit 1
fi

# Verify assetPrefix: '/ralph-node-resume'
if ! grep -q "assetPrefix: ['\"]/ralph-node-resume['\"]" next.config.mjs; then
  echo "FAIL: assetPrefix is not set to '/ralph-node-resume'"
  exit 1
fi

# Verify images.unoptimized: true
if ! grep -q "unoptimized: true" next.config.mjs; then
  echo "FAIL: images.unoptimized is not set to true"
  exit 1
fi

# Verify trailingSlash: true
if ! grep -q "trailingSlash: true" next.config.mjs; then
  echo "FAIL: trailingSlash is not set to true"
  exit 1
fi

# Verify reactStrictMode: true
if ! grep -q "reactStrictMode: true" next.config.mjs; then
  echo "FAIL: reactStrictMode is not set to true"
  exit 1
fi

echo "PASS: next.config.mjs created with correct config"