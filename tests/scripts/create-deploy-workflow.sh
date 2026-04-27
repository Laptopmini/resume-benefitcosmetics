#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WF=".github/workflows/deploy.yml"

# File must exist
assert ".github/workflows/deploy.yml exists" test -f "$WF"

# Top-level name
assert_grep "has name: Deploy to GitHub Pages" "name: Deploy to GitHub Pages" "$WF"

# Trigger: push to main
assert_grep "has trigger on push to main" "branches: [main]" "$WF"
assert_grep "has trigger workflow_dispatch" "workflow_dispatch:" "$WF"

# Top-level permissions
assert_grep "has permissions contents: read" "contents: read" "$WF"
assert_grep "has permissions pages: write" "pages: write" "$WF"
assert_grep "has permissions id-token: write" "id-token: write" "$WF"

# Concurrency
assert_grep "has concurrency group: pages" "group: pages" "$WF"
assert_grep "has concurrency cancel-in-progress: false" "cancel-in-progress: false" "$WF"

# Build job
assert_grep "has build job on ubuntu-latest" "runs-on: ubuntu-latest" "$WF"
assert_grep "has actions/checkout@v4" "actions/checkout@v4" "$WF"
assert_grep "has actions/setup-node@v4" "actions/setup-node@v4" "$WF"
assert_grep "has node-version-file: .nvmrc" "node-version-file: .nvmrc" "$WF"
assert_grep "has cache: npm" "cache: npm" "$WF"
assert_grep "has actions/configure-pages@v5" "actions/configure-pages@v5" "$WF"
assert_grep "has npm ci step" "npm ci" "$WF"
assert_grep "has npm run build step" "npm run build" "$WF"
assert_grep "has actions/upload-pages-artifact@v3" "actions/upload-pages-artifact@v3" "$WF"
assert_grep "has path: ./out" "path: ./out" "$WF"

# Deploy job
assert_grep "has deploy job that needs build" "needs: build" "$WF"
assert_grep "has environment name: github-pages" "name: github-pages" "$WF"
assert_grep "has deploy-pages@v4 step" "actions/deploy-pages@v4" "$WF"
assert_grep "has deployment id" "id: deployment" "$WF"

report_results