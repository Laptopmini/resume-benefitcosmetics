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
  fail "$WORKFLOW does not exist"
  echo ""
  echo "$ERRORS test(s) failed."
  exit 1
fi

CONTENT=$(cat "$WORKFLOW")

# --- name ---
echo "$CONTENT" | grep -q 'name:.*Deploy to GitHub Pages' \
  || fail "Workflow name must be 'Deploy to GitHub Pages'"

# --- triggers ---
echo "$CONTENT" | grep -q 'push:' \
  || fail "Missing push trigger"
echo "$CONTENT" | grep -q 'branches:' \
  || fail "Missing branches filter under push"
echo "$CONTENT" | grep -qE '\[\s*main\s*\]|−\s*main' \
  || fail "push.branches must include 'main'"
echo "$CONTENT" | grep -q 'workflow_dispatch:' \
  || fail "Missing workflow_dispatch trigger"

# --- top-level permissions ---
echo "$CONTENT" | grep -q 'permissions:' \
  || fail "Missing top-level permissions block"
echo "$CONTENT" | grep -q 'contents:.*read' \
  || fail "permissions.contents must be 'read'"
echo "$CONTENT" | grep -q 'pages:.*write' \
  || fail "permissions.pages must be 'write'"
echo "$CONTENT" | grep -q 'id-token:.*write' \
  || fail "permissions.id-token must be 'write'"

# --- concurrency ---
echo "$CONTENT" | grep -q 'concurrency:' \
  || fail "Missing concurrency block"
echo "$CONTENT" | grep -qE 'group:.*pages' \
  || fail "concurrency.group must be 'pages'"
echo "$CONTENT" | grep -q 'cancel-in-progress:.*false' \
  || fail "concurrency.cancel-in-progress must be false"

# --- build job ---
echo "$CONTENT" | grep -q 'build:' \
  || fail "Missing 'build' job"
echo "$CONTENT" | grep -q 'ubuntu-latest' \
  || fail "build job must run on ubuntu-latest"

# build job steps
echo "$CONTENT" | grep -q 'actions/checkout@v4' \
  || fail "build job must use actions/checkout@v4"
echo "$CONTENT" | grep -q 'actions/setup-node@v4' \
  || fail "build job must use actions/setup-node@v4"
echo "$CONTENT" | grep -q 'node-version-file:.*\.nvmrc' \
  || fail "setup-node must use node-version-file: .nvmrc"
echo "$CONTENT" | grep -q 'cache:.*npm' \
  || fail "setup-node must use cache: npm"
echo "$CONTENT" | grep -q 'actions/configure-pages@v5' \
  || fail "build job must use actions/configure-pages@v5"
echo "$CONTENT" | grep -q 'npm ci' \
  || fail "build job must run 'npm ci'"
echo "$CONTENT" | grep -q 'npm run build' \
  || fail "build job must run 'npm run build'"
echo "$CONTENT" | grep -q 'actions/upload-pages-artifact@v3' \
  || fail "build job must use actions/upload-pages-artifact@v3"
echo "$CONTENT" | grep -qE 'path:.*\./out' \
  || fail "upload-pages-artifact must have path: ./out"

# --- deploy job ---
echo "$CONTENT" | grep -q 'deploy:' \
  || fail "Missing 'deploy' job"
echo "$CONTENT" | grep -q 'needs:.*build' \
  || fail "deploy job must need 'build'"
echo "$CONTENT" | grep -q 'github-pages' \
  || fail "deploy job must use environment name 'github-pages'"
echo "$CONTENT" | grep -qE 'url:.*steps\.deployment\.outputs\.page_url' \
  || fail "deploy job environment url must reference steps.deployment.outputs.page_url"
echo "$CONTENT" | grep -q 'actions/deploy-pages@v4' \
  || fail "deploy job must use actions/deploy-pages@v4"
echo "$CONTENT" | grep -q 'id:.*deployment' \
  || fail "deploy-pages step must have id: deployment"

# --- Summary ---
echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "$ERRORS test(s) failed."
  exit 1
else
  echo "All tests passed."
  exit 0
fi
