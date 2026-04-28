#!/usr/bin/env bash
set -euo pipefail
source "$(cd "$(dirname "$0")" && pwd)/../helpers/assert.sh"

DEPLOY_YML=".github/workflows/deploy.yml"

assert_grep "deploy.yml exists" "name: Deploy to GitHub Pages" "$DEPLOY_YML"
assert_grep "trigger on push to main" "push:" "$DEPLOY_YML"
assert_grep "trigger on workflow_dispatch" "workflow_dispatch:" "$DEPLOY_YML"
assert_grep "permissions contents read" "contents: read" "$DEPLOY_YML"
assert_grep "permissions pages write" "pages: write" "$DEPLOY_YML"
assert_grep "permissions id-token write" "id-token: write" "$DEPLOY_YML"
assert_grep "concurrency group pages" "group: pages" "$DEPLOY_YML"
assert_grep "concurrency cancel-in-progress false" "cancel-in-progress: false" "$DEPLOY_YML"
assert_grep "build job exists" "build:" "$DEPLOY_YML"
assert_grep "build runs on ubuntu-latest" "runs-on: ubuntu-latest" "$DEPLOY_YML"
assert_grep "uses actions/checkout@v4" "actions/checkout@v4" "$DEPLOY_YML"
assert_grep "uses actions/setup-node@v4" "actions/setup-node@v4" "$DEPLOY_YML"
assert_grep "node-version-file .nvmrc" "node-version-file: .nvmrc" "$DEPLOY_YML"
assert_grep "cache npm" "cache: npm" "$DEPLOY_YML"
assert_grep "uses actions/configure-pages@v5" "actions/configure-pages@v5" "$DEPLOY_YML"
assert_grep "runs npm ci" "npm ci" "$DEPLOY_YML"
assert_grep "runs npm run build" "npm run build" "$DEPLOY_YML"
assert_grep "uses actions/upload-pages-artifact@v3" "actions/upload-pages-artifact@v3" "$DEPLOY_YML"
assert_grep "upload-pages-artifact path ./out" "path: ./out" "$DEPLOY_YML"
assert_grep "deploy job exists" "deploy:" "$DEPLOY_YML"
assert_grep "deploy needs build" "needs: build" "$DEPLOY_YML"
assert_grep "deploy environment github-pages" "name: github-pages" "$DEPLOY_YML"
assert_grep "deploy runs on ubuntu-latest" "runs-on: ubuntu-latest" "$DEPLOY_YML"
assert_grep "uses actions/deploy-pages@v4" "actions/deploy-pages@v4" "$DEPLOY_YML"
assert_grep "deploy step has id deployment" "id: deployment" "$DEPLOY_YML"

report_results