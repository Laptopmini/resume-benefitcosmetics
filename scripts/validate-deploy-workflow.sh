#!/usr/bin/env bash
set -euo pipefail

WORKFLOW=".github/workflows/deploy.yml"
ERRORS=0

fail() {
  echo "FAIL: $1"
  ERRORS=$((ERRORS + 1))
}

# --- File existence ---
if [ ! -f "$WORKFLOW" ]; then
  echo "FAIL: $WORKFLOW does not exist"
  exit 1
fi

CONTENT=$(cat "$WORKFLOW")

# --- Workflow name ---
echo "$CONTENT" | grep -qE '^name:\s*Deploy to GitHub Pages' \
  || fail "Workflow name must be 'Deploy to GitHub Pages'"

# --- Trigger: push on main ---
echo "$CONTENT" | grep -q 'push:' \
  || fail "Missing push trigger"
echo "$CONTENT" | grep -qE 'branches:\s*\[main\]' \
  || fail "Push trigger must target branches: [main]"

# --- Trigger: workflow_dispatch ---
echo "$CONTENT" | grep -q 'workflow_dispatch:' \
  || fail "Missing workflow_dispatch trigger"

# --- Top-level permissions ---
echo "$CONTENT" | grep -q 'contents: read' \
  || fail "Missing permission: contents: read"
echo "$CONTENT" | grep -q 'pages: write' \
  || fail "Missing permission: pages: write"
echo "$CONTENT" | grep -q 'id-token: write' \
  || fail "Missing permission: id-token: write"

# --- Concurrency ---
echo "$CONTENT" | grep -qE 'group:\s*"pages"' \
  || echo "$CONTENT" | grep -qE "group:\s*'pages'" \
  || echo "$CONTENT" | grep -qE 'group:\s*pages' \
  || fail "Missing concurrency group 'pages'"
echo "$CONTENT" | grep -q 'cancel-in-progress: false' \
  || fail "cancel-in-progress must be false"

# --- Build job ---
echo "$CONTENT" | grep -q 'build:' \
  || fail "Missing 'build' job"
echo "$CONTENT" | grep -q 'ubuntu-latest' \
  || fail "Jobs must run on ubuntu-latest"

# --- Build job steps ---
echo "$CONTENT" | grep -q 'actions/checkout@v4' \
  || fail "Missing actions/checkout@v4 step"
echo "$CONTENT" | grep -q 'actions/setup-node@v4' \
  || fail "Missing actions/setup-node@v4 step"
echo "$CONTENT" | grep -q 'node-version-file:' \
  || fail "Missing node-version-file in setup-node"
echo "$CONTENT" | grep -q '.nvmrc' \
  || fail "node-version-file must reference .nvmrc"
echo "$CONTENT" | grep -qE 'cache:\s*npm' \
  || fail "Missing cache: npm in setup-node"
echo "$CONTENT" | grep -q 'actions/configure-pages@v5' \
  || fail "Missing actions/configure-pages@v5 step"
echo "$CONTENT" | grep -q 'npm ci' \
  || fail "Missing 'npm ci' step"
echo "$CONTENT" | grep -q 'npm run build' \
  || fail "Missing 'npm run build' step"
echo "$CONTENT" | grep -q 'actions/upload-pages-artifact@v3' \
  || fail "Missing actions/upload-pages-artifact@v3 step"
echo "$CONTENT" | grep -qE 'path:\s*\./out' \
  || fail "upload-pages-artifact path must be ./out"

# --- Deploy job ---
echo "$CONTENT" | grep -q 'deploy:' \
  || fail "Missing 'deploy' job"
echo "$CONTENT" | grep -q 'needs: build' \
  || fail "Deploy job must have 'needs: build'"
echo "$CONTENT" | grep -q 'github-pages' \
  || fail "Deploy job must use environment 'github-pages'"
echo "$CONTENT" | grep -q 'actions/deploy-pages@v4' \
  || fail "Missing actions/deploy-pages@v4 step"
echo "$CONTENT" | grep -qE 'id:\s*deployment' \
  || fail "deploy-pages step must have id: deployment"

# --- Result ---
if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS check(s) failed."
  exit 1
fi

echo "All deploy workflow checks passed."
