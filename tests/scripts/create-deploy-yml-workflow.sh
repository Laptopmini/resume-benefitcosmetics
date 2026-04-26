#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WORKFLOW=".github/workflows/deploy.yml"

# File existence
assert "deploy.yml exists" test -f "$WORKFLOW"

# Workflow name
assert_grep "name is Deploy to GitHub Pages" "name: Deploy to GitHub Pages" "$WORKFLOW"

# Triggers
assert_grep_regex "triggers on push to main" "push:" "$WORKFLOW"
assert_grep_regex "branches includes main" "branches:.*main" "$WORKFLOW"
assert_grep_regex "workflow_dispatch trigger" "workflow_dispatch" "$WORKFLOW"

# Top-level permissions
assert_grep "permissions: contents read" "contents: read" "$WORKFLOW"
assert_grep "permissions: pages write" "pages: write" "$WORKFLOW"
assert_grep "permissions: id-token write" "id-token: write" "$WORKFLOW"

# Concurrency
assert_grep_regex "concurrency group is pages" 'group:.*pages' "$WORKFLOW"
assert_grep "cancel-in-progress false" "cancel-in-progress: false" "$WORKFLOW"

# Build job
assert_grep "build job defined" "build:" "$WORKFLOW"
assert_grep "build runs on ubuntu-latest" "ubuntu-latest" "$WORKFLOW"
assert_grep "checkout action v4" "actions/checkout@v4" "$WORKFLOW"
assert_grep "setup-node action v4" "actions/setup-node@v4" "$WORKFLOW"
assert_grep "node-version-file .nvmrc" "node-version-file:" "$WORKFLOW"
assert_grep "cache npm" "cache: npm" "$WORKFLOW"
assert_grep "configure-pages action v5" "actions/configure-pages@v5" "$WORKFLOW"
assert_grep "npm ci step" "npm ci" "$WORKFLOW"
assert_grep "npm run build step" "npm run build" "$WORKFLOW"
assert_grep "upload-pages-artifact v3" "actions/upload-pages-artifact@v3" "$WORKFLOW"
assert_grep_regex "upload path is ./out" 'path:.*\./out' "$WORKFLOW"

# Deploy job
assert_grep "deploy job defined" "deploy:" "$WORKFLOW"
assert_grep "deploy needs build" "needs: build" "$WORKFLOW"
assert_grep "environment name github-pages" "github-pages" "$WORKFLOW"
assert_grep_regex "deploy pages url output" 'steps\.deployment\.outputs\.page_url' "$WORKFLOW"
assert_grep "deploy-pages action v4" "actions/deploy-pages@v4" "$WORKFLOW"
assert_grep "deployment step id" "id: deployment" "$WORKFLOW"

report_results
