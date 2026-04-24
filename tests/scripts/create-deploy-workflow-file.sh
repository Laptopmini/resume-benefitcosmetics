#!/bin/bash
set -e

DEPLOY_WORKFLOW=".github/workflows/deploy.yml"

if [ ! -f "$DEPLOY_WORKFLOW" ]; then
  echo "FAIL: $DEPLOY_WORKFLOW does not exist"
  exit 1
fi

if ! grep -q "name: Deploy to GitHub Pages" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing 'name: Deploy to GitHub Pages'"
  exit 1
fi

if ! grep -q "on:" "$DEPLOY_WORKFLOW" || ! grep -q "push:" "$DEPLOY_WORKFLOW" || ! grep -q "branches:" "$DEPLOY_WORKFLOW" || ! grep -q "\[main\]" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing push trigger on main branch"
  exit 1
fi

if ! grep -q "workflow_dispatch:" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing workflow_dispatch trigger"
  exit 1
fi

if ! grep -q "permissions:" "$DEPLOY_WORKFLOW" || ! grep -q "contents: read" "$DEPLOY_WORKFLOW" || ! grep -q "pages: write" "$DEPLOY_WORKFLOW" || ! grep -q "id-token: write" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing top-level permissions"
  exit 1
fi

if ! grep -q "concurrency:" "$DEPLOY_WORKFLOW" || ! grep -q "group: \"pages\"" "$DEPLOY_WORKFLOW" || ! grep -q "cancel-in-progress: false" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing concurrency configuration"
  exit 1
fi

if ! grep -q "jobs:" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing jobs section"
  exit 1
fi

if ! grep -q "build:" "$DEPLOY_WORKFLOW" || ! grep -q "runs-on: ubuntu-latest" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing build job with ubuntu-latest"
  exit 1
fi

if ! grep -q "actions/checkout@v4" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing actions/checkout@v4 in build job"
  exit 1
fi

if ! grep -q "actions/setup-node@v4" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing actions/setup-node@v4 in build job"
  exit 1
fi

if ! grep -q "node-version-file: .nvmrc" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing node-version-file: .nvmrc"
  exit 1
fi

if ! grep -q "cache: npm" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing cache: npm"
  exit 1
fi

if ! grep -q "actions/configure-pages@v5" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing actions/configure-pages@v5"
  exit 1
fi

if ! grep -q "npm ci" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing 'npm ci' step"
  exit 1
fi

if ! grep -q "npm run build" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing 'npm run build' step"
  exit 1
fi

if ! grep -q "actions/upload-pages-artifact@v3" "$DEPLOY_WORKFLOW" || ! grep -q "path: ./out" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing actions/upload-pages-artifact@v3 with path: ./out"
  exit 1
fi

if ! grep -q "deploy:" "$DEPLOY_WORKFLOW" || ! grep -q "needs: build" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing deploy job that needs build"
  exit 1
fi

if ! grep -q "environment:" "$DEPLOY_WORKFLOW" || ! grep -q "name: github-pages" "$DEPLOY_WORKFLOW" || ! grep -q "url:" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing environment configuration"
  exit 1
fi

if ! grep -q "actions/deploy-pages@v4" "$DEPLOY_WORKFLOW" || ! grep -q "id: deployment" "$DEPLOY_WORKFLOW"; then
  echo "FAIL: missing actions/deploy-pages@v4 with id: deployment"
  exit 1
fi

echo "PASS: $DEPLOY_WORKFLOW exists and has correct structure"
exit 0
