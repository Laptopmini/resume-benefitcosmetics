#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WORKFLOW=".github/workflows/deploy.yml"

# File exists
assert "deploy.yml exists" test -f "$WORKFLOW"

# Workflow name
assert_grep "name is 'Deploy to GitHub Pages'" "name: Deploy to GitHub Pages" "$WORKFLOW"

# Triggers
assert_grep "triggers on push to main" "branches:" "$WORKFLOW"
assert_grep_regex "main branch in push trigger" "\\bmain\\b" "$WORKFLOW"
assert_grep "workflow_dispatch trigger" "workflow_dispatch" "$WORKFLOW"

# Top-level permissions
assert_grep "contents: read permission" "contents: read" "$WORKFLOW"
assert_grep "pages: write permission" "pages: write" "$WORKFLOW"
assert_grep "id-token: write permission" "id-token: write" "$WORKFLOW"

# Concurrency
assert_grep "concurrency group is pages" 'group: "pages"' "$WORKFLOW"
assert_grep "cancel-in-progress is false" "cancel-in-progress: false" "$WORKFLOW"

# Build job
assert_grep "build job exists" "build:" "$WORKFLOW"
assert_grep "runs on ubuntu-latest" "ubuntu-latest" "$WORKFLOW"
assert_grep "uses actions/checkout@v4" "actions/checkout@v4" "$WORKFLOW"
assert_grep "uses actions/setup-node@v4" "actions/setup-node@v4" "$WORKFLOW"
assert_grep "node-version-file references .nvmrc" "node-version-file:" "$WORKFLOW"
assert_grep "nvmrc value" ".nvmrc" "$WORKFLOW"
assert_grep "cache npm" "cache: npm" "$WORKFLOW"
assert_grep "uses actions/configure-pages@v5" "actions/configure-pages@v5" "$WORKFLOW"
assert_grep "npm ci step" "npm ci" "$WORKFLOW"
assert_grep "npm run build step" "npm run build" "$WORKFLOW"
assert_grep "uses actions/upload-pages-artifact@v3" "actions/upload-pages-artifact@v3" "$WORKFLOW"
assert_grep "upload path is ./out" "./out" "$WORKFLOW"

# Deploy job
assert_grep "deploy job exists" "deploy:" "$WORKFLOW"
assert_grep "deploy needs build" "needs: build" "$WORKFLOW"
assert_grep "environment name is github-pages" "github-pages" "$WORKFLOW"
assert_grep_regex "environment url references deployment output" "steps\\.deployment\\.outputs\\.page_url" "$WORKFLOW"
assert_grep "uses actions/deploy-pages@v4" "actions/deploy-pages@v4" "$WORKFLOW"
assert_grep "deployment step id" "id: deployment" "$WORKFLOW"

report_results
