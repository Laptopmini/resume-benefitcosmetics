#!/usr/bin/env bash
set -euo pipefail

WORKFLOW=".github/workflows/deploy.yml"

# --- File existence ---
if [ ! -f "$WORKFLOW" ]; then
  echo "FAIL: $WORKFLOW does not exist"
  exit 1
fi

CONTENT=$(cat "$WORKFLOW")

# Helper: assert a pattern exists in the file
assert_match() {
  local label="$1"
  local pattern="$2"
  if ! echo "$CONTENT" | grep -qE "$pattern"; then
    echo "FAIL: $label — pattern not found: $pattern"
    exit 1
  fi
}

# --- Top-level name ---
assert_match "workflow name" "^name:.*Deploy to GitHub Pages"

# --- Triggers ---
assert_match "push trigger on main" "push:"
assert_match "branches main" "branches:.*\[.*main.*\]"
assert_match "workflow_dispatch" "workflow_dispatch:"

# --- Top-level permissions ---
assert_match "permissions contents read" "contents:.*read"
assert_match "permissions pages write" "pages:.*write"
assert_match "permissions id-token write" "id-token:.*write"

# --- Concurrency ---
assert_match "concurrency group pages" "group:.*pages"
assert_match "cancel-in-progress false" "cancel-in-progress:.*false"

# --- Build job ---
assert_match "build job" "build:"
assert_match "runs-on ubuntu-latest (build)" "runs-on:.*ubuntu-latest"
assert_match "actions/checkout@v4" "actions/checkout@v4"
assert_match "actions/setup-node@v4" "actions/setup-node@v4"
assert_match "node-version-file .nvmrc" "node-version-file:.*\.nvmrc"
assert_match "cache npm" "cache:.*npm"
assert_match "actions/configure-pages@v5" "actions/configure-pages@v5"
assert_match "npm ci step" "npm ci"
assert_match "npm run build step" "npm run build"
assert_match "actions/upload-pages-artifact@v3" "actions/upload-pages-artifact@v3"
assert_match "upload path ./out" "path:.*\./out"

# --- Deploy job ---
assert_match "deploy job" "deploy:"
assert_match "deploy needs build" "needs:.*build"
assert_match "environment name github-pages" "name:.*github-pages"
assert_match "environment url uses deployment output" "url:.*steps\.deployment\.outputs\.page_url"
assert_match "actions/deploy-pages@v4" "actions/deploy-pages@v4"
assert_match "deployment step id" "id:.*deployment"

echo "PASS: all deploy workflow assertions passed"
