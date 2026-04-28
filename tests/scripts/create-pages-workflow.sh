#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

WORKFLOW=".github/workflows/deploy-pages.yml"

# --- File existence ---
assert "workflow file exists" test -f "$WORKFLOW"

# --- Workflow name ---
assert_grep "workflow named Deploy to GitHub Pages" "Deploy to GitHub Pages" "$WORKFLOW"

# --- Triggers ---
assert_grep "triggered on push" "push:" "$WORKFLOW"
assert_grep_regex "push targets main branch" "branches:.*main" "$WORKFLOW"
assert_grep "triggered on workflow_dispatch" "workflow_dispatch:" "$WORKFLOW"

# --- Top-level permissions ---
assert_grep "permissions contents read" "contents: read" "$WORKFLOW"
assert_grep "permissions pages write" "pages: write" "$WORKFLOW"
assert_grep "permissions id-token write" "id-token: write" "$WORKFLOW"

# --- Concurrency ---
assert_grep_regex "concurrency group pages" "group:.*pages" "$WORKFLOW"
assert_grep "cancel-in-progress false" "cancel-in-progress: false" "$WORKFLOW"

# --- Build job ---
assert_grep "build job defined" "build:" "$WORKFLOW"
assert_grep "build runs-on ubuntu-latest" "ubuntu-latest" "$WORKFLOW"
assert_grep "uses actions/checkout@v4" "actions/checkout@v4" "$WORKFLOW"
assert_grep "uses actions/setup-node@v4" "actions/setup-node@v4" "$WORKFLOW"
assert_grep "node-version-file .nvmrc" ".nvmrc" "$WORKFLOW"
assert_grep_regex "cache npm" "cache:.*npm" "$WORKFLOW"
assert_grep "run npm ci" "npm ci" "$WORKFLOW"
assert_grep "run npm run build" "npm run build" "$WORKFLOW"
assert_grep "uses upload-pages-artifact@v3" "actions/upload-pages-artifact@v3" "$WORKFLOW"
assert_grep_regex "upload path ./out" "path:.*./out" "$WORKFLOW"

# --- Deploy job ---
assert_grep "deploy job defined" "deploy:" "$WORKFLOW"
assert_grep_regex "deploy needs build" "needs:.*build" "$WORKFLOW"
assert_grep "deploy environment github-pages" "github-pages" "$WORKFLOW"
assert_grep_regex "deploy url references deployment step" "steps.deployment.outputs.page_url" "$WORKFLOW"
assert_grep "uses deploy-pages@v4" "actions/deploy-pages@v4" "$WORKFLOW"
assert_grep "deployment step id" "id: deployment" "$WORKFLOW"

# --- Scope guard: no other files modified ---
# The workflow should be the only file in .github/workflows/ created by this task.
# We just verify the file is where it should be (already checked above).

report_results
