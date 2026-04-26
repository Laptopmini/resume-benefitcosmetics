#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WORKFLOW=".github/workflows/deploy.yml"

# File exists
assert "deploy.yml exists" test -f "$WORKFLOW"

# Workflow name
assert_grep "workflow name is 'Deploy to GitHub Pages'" "name: Deploy to GitHub Pages" "$WORKFLOW"

# Trigger: push to main
assert_grep "triggers on push to main" "branches: [main]" "$WORKFLOW"
assert_grep_regex "triggers on push" "on:" "$WORKFLOW"
assert_grep "triggers on workflow_dispatch" "workflow_dispatch:" "$WORKFLOW"

# Top-level permissions
assert_grep "permissions: contents read" "contents: read" "$WORKFLOW"
assert_grep "permissions: pages write" "pages: write" "$WORKFLOW"
assert_grep "permissions: id-token write" "id-token: write" "$WORKFLOW"

# Concurrency
assert_grep "concurrency group is pages" 'group: "pages"' "$WORKFLOW"
assert_grep "cancel-in-progress is false" "cancel-in-progress: false" "$WORKFLOW"

# Build job
assert_grep "build job exists" "build:" "$WORKFLOW"
assert_grep "build runs on ubuntu-latest" "ubuntu-latest" "$WORKFLOW"
assert_grep "uses actions/checkout@v4" "actions/checkout@v4" "$WORKFLOW"
assert_grep "uses actions/setup-node@v4" "actions/setup-node@v4" "$WORKFLOW"
assert_grep "node-version-file is .nvmrc" "node-version-file: .nvmrc" "$WORKFLOW"
assert_grep "cache npm" "cache: npm" "$WORKFLOW"
assert_grep "uses actions/configure-pages@v5" "actions/configure-pages@v5" "$WORKFLOW"
assert_grep "runs npm ci" "npm ci" "$WORKFLOW"
assert_grep "runs npm run build" "npm run build" "$WORKFLOW"
assert_grep "uses actions/upload-pages-artifact@v3" "actions/upload-pages-artifact@v3" "$WORKFLOW"
assert_grep "upload path is ./out" "path: ./out" "$WORKFLOW"

# Deploy job
assert_grep "deploy job exists" "deploy:" "$WORKFLOW"
assert_grep "deploy needs build" "needs: build" "$WORKFLOW"
assert_grep "environment name is github-pages" "name: github-pages" "$WORKFLOW"
assert_grep_regex "environment url references deployment output" "steps\.deployment\.outputs\.page_url" "$WORKFLOW"
assert_grep "uses actions/deploy-pages@v4" "actions/deploy-pages@v4" "$WORKFLOW"
assert_grep "deployment step has id: deployment" "id: deployment" "$WORKFLOW"

report_results
