#!/usr/bin/env bash
# Validation script for .github/workflows/deploy.yml
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

FILE=".github/workflows/deploy.yml"

# Workflow name
assert_grep "workflow has name 'Deploy to GitHub Pages'" "name: Deploy to GitHub Pages" "$FILE"

# Trigger: push to main
assert_grep "trigger on push to main branch" "branches: \[main\]" "$FILE"
assert_grep "trigger includes workflow_dispatch" "workflow_dispatch:" "$FILE"

# Top-level permissions
assert_grep "top-level permissions.contents read" "permissions:" "$FILE"
assert_grep "permissions.contents read" "contents: read" "$FILE"
assert_grep "permissions.pages write" "pages: write" "$FILE"
assert_grep "permissions.id-token write" "id-token: write" "$FILE"

# Concurrency
assert_grep "concurrency group pages" "concurrency:" "$FILE"
assert_grep "concurrency group name" "group: \"pages\"" "$FILE"
assert_grep "cancel-in-progress false" "cancel-in-progress: false" "$FILE"

# Build job
assert_grep "build job defined" "jobs:" "$FILE"
assert_grep "build job on ubuntu-latest" "runs-on: ubuntu-latest" "$FILE"
assert_grep "build has checkout step" "actions/checkout@v4" "$FILE"
assert_grep "build has setup-node step" "actions/setup-node@v4" "$FILE"
assert_grep "build uses node-version-file" "node-version-file: .nvmrc" "$FILE"
assert_grep "build uses npm cache" "cache: npm" "$FILE"
assert_grep "build has configure-pages step" "actions/configure-pages@v5" "$FILE"
assert_grep "build runs npm ci" "npm ci" "$FILE"
assert_grep "build runs npm run build" "npm run build" "$FILE"
assert_grep "build uploads pages artifact" "actions/upload-pages-artifact@v3" "$FILE"
assert_grep "build artifact path ./out" "path: ./out" "$FILE"

# Deploy job
assert_grep "deploy job defined" "jobs:" "$FILE"
assert_grep_regex "deploy job needs build" "needs:\s*build" "$FILE"
assert_grep "deploy runs on ubuntu-latest" "runs-on: ubuntu-latest" "$FILE"
assert_grep "deploy environment github-pages" "name: github-pages" "$FILE"
assert_grep "deploy has deploy-pages step" "actions/deploy-pages@v4" "$FILE"
assert_grep "deploy step has id: deployment" "id: deployment" "$FILE"

report_results