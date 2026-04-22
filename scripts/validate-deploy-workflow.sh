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

# --- Top-level name ---
echo "$CONTENT" | grep -qE '^name:\s*Deploy to GitHub Pages' || fail "name must be 'Deploy to GitHub Pages'"

# --- Trigger: push to main ---
echo "$CONTENT" | grep -qE '^\s+push:' || fail "missing push trigger"
echo "$CONTENT" | grep -qE '^\s+branches:\s*\[main\]' || fail "push trigger must target [main]"

# --- Trigger: workflow_dispatch ---
echo "$CONTENT" | grep -qE '^\s+workflow_dispatch:' || fail "missing workflow_dispatch trigger"

# --- Top-level permissions ---
echo "$CONTENT" | grep -qE '^\s*permissions:' || fail "missing top-level permissions"
echo "$CONTENT" | grep -qE '^\s+contents:\s*read' || fail "permissions must include contents: read"
echo "$CONTENT" | grep -qE '^\s+pages:\s*write' || fail "permissions must include pages: write"
echo "$CONTENT" | grep -qE '^\s+id-token:\s*write' || fail "permissions must include id-token: write"

# --- Concurrency ---
echo "$CONTENT" | grep -qE '^\s*concurrency:' || fail "missing concurrency block"
echo "$CONTENT" | grep -qE '^\s+group:\s*.*pages' || fail "concurrency group must reference 'pages'"
echo "$CONTENT" | grep -qE '^\s+cancel-in-progress:\s*false' || fail "cancel-in-progress must be false"

# --- Build job ---
echo "$CONTENT" | grep -qE '^\s+build:' || fail "missing build job"
echo "$CONTENT" | grep -qE 'runs-on:\s*ubuntu-latest' || fail "build job must run on ubuntu-latest"

# --- Build job steps ---
echo "$CONTENT" | grep -qE 'uses:\s*actions/checkout@v4' || fail "missing actions/checkout@v4 step"
echo "$CONTENT" | grep -qE 'uses:\s*actions/setup-node@v4' || fail "missing actions/setup-node@v4 step"
echo "$CONTENT" | grep -qE 'node-version-file:\s*\.nvmrc' || fail "setup-node must use node-version-file: .nvmrc"
echo "$CONTENT" | grep -qE 'cache:\s*npm' || fail "setup-node must use cache: npm"
echo "$CONTENT" | grep -qE 'uses:\s*actions/configure-pages@v5' || fail "missing actions/configure-pages@v5 step"
echo "$CONTENT" | grep -qE 'npm ci' || fail "missing 'npm ci' step"
echo "$CONTENT" | grep -qE 'npm run build' || fail "missing 'npm run build' step"
echo "$CONTENT" | grep -qE 'uses:\s*actions/upload-pages-artifact@v3' || fail "missing actions/upload-pages-artifact@v3 step"
echo "$CONTENT" | grep -qE 'path:\s*\./out' || fail "upload-pages-artifact must use path: ./out"

# --- Deploy job ---
echo "$CONTENT" | grep -qE '^\s+deploy:' || fail "missing deploy job"
echo "$CONTENT" | grep -qE 'needs:\s*build' || fail "deploy job must need build"
echo "$CONTENT" | grep -qE 'name:\s*github-pages' || fail "deploy environment must be named github-pages"
echo "$CONTENT" | grep -q 'steps.deployment.outputs.page_url' || fail "deploy environment url must reference steps.deployment.outputs.page_url"
echo "$CONTENT" | grep -qE 'uses:\s*actions/deploy-pages@v4' || fail "missing actions/deploy-pages@v4 step"
echo "$CONTENT" | grep -qE 'id:\s*deployment' || fail "deploy-pages step must have id: deployment"

# --- Result ---
if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS check(s) failed."
  exit 1
fi

echo "All deploy workflow checks passed."
exit 0
