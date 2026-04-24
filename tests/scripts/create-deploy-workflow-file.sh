#!/usr/bin/env bash
set -euo pipefail

WORKFLOW=".github/workflows/deploy.yml"
ERRORS=0

fail() {
  echo "FAIL: $1"
  ERRORS=$((ERRORS + 1))
}

if [ ! -f "$WORKFLOW" ]; then
  echo "FAIL: $WORKFLOW does not exist"
  exit 1
fi

CONTENT=$(cat "$WORKFLOW")

# --- name ---
echo "$CONTENT" | grep -qE '^name:\s*Deploy to GitHub Pages' || fail "name must be 'Deploy to GitHub Pages'"

# --- triggers ---
echo "$CONTENT" | grep -qE '^\s*push:' || fail "missing push trigger"
echo "$CONTENT" | grep -qE '^\s*branches:\s*\[main\]' || fail "push trigger must target branches: [main]"
echo "$CONTENT" | grep -qE '^\s*workflow_dispatch:' || fail "missing workflow_dispatch trigger"

# --- top-level permissions ---
echo "$CONTENT" | grep -qE '^\s*contents:\s*read' || fail "missing permissions.contents: read"
echo "$CONTENT" | grep -qE '^\s*pages:\s*write' || fail "missing permissions.pages: write"
echo "$CONTENT" | grep -qE '^\s*id-token:\s*write' || fail "missing permissions.id-token: write"

# --- concurrency ---
echo "$CONTENT" | grep -qE '^\s*group:\s*"?pages"?' || fail "missing concurrency.group: pages"
echo "$CONTENT" | grep -qE '^\s*cancel-in-progress:\s*false' || fail "missing concurrency.cancel-in-progress: false"

# --- build job ---
echo "$CONTENT" | grep -qE '^\s*build:' || fail "missing build job"
echo "$CONTENT" | grep -qE 'runs-on:\s*ubuntu-latest' || fail "build job must run on ubuntu-latest"
echo "$CONTENT" | grep -qE 'actions/checkout@v4' || fail "missing actions/checkout@v4 step"
echo "$CONTENT" | grep -qE 'actions/setup-node@v4' || fail "missing actions/setup-node@v4 step"
echo "$CONTENT" | grep -qE 'node-version-file:\s*.nvmrc' || fail "setup-node must use node-version-file: .nvmrc"
echo "$CONTENT" | grep -qE 'cache:\s*npm' || fail "setup-node must use cache: npm"
echo "$CONTENT" | grep -qE 'actions/configure-pages@v5' || fail "missing actions/configure-pages@v5 step"
echo "$CONTENT" | grep -qE 'npm ci' || fail "missing npm ci step"
echo "$CONTENT" | grep -qE 'npm run build' || fail "missing npm run build step"
echo "$CONTENT" | grep -qE 'actions/upload-pages-artifact@v3' || fail "missing actions/upload-pages-artifact@v3 step"
echo "$CONTENT" | grep -qE 'path:\s*\./out' || fail "upload-pages-artifact must use path: ./out"

# --- deploy job ---
echo "$CONTENT" | grep -qE '^\s*deploy:' || fail "missing deploy job"
echo "$CONTENT" | grep -qE 'needs:\s*build' || fail "deploy job must have needs: build"
echo "$CONTENT" | grep -qE 'name:\s*github-pages' || fail "deploy job environment must have name: github-pages"
echo "$CONTENT" | grep -qE 'actions/deploy-pages@v4' || fail "missing actions/deploy-pages@v4 step"
echo "$CONTENT" | grep -qE 'id:\s*deployment' || fail "deploy-pages step must have id: deployment"

if [ "$ERRORS" -gt 0 ]; then
  echo ""
  echo "$ERRORS check(s) failed"
  exit 1
fi

echo "All checks passed"
exit 0
