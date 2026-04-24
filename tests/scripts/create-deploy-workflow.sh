#!/bin/bash
set -e

WORKFLOW_PATH=".github/workflows/deploy.yml"

if [ ! -f "$WORKFLOW_PATH" ]; then
  echo "FAIL: $WORKFLOW_PATH does not exist"
  exit 1
fi

echo "Checking workflow file structure..."

REQUIRED_ELEMENTS=(
  "name: Deploy to GitHub Pages"
  "on:"
  "push:"
  "branches:"
  "- main"
  "workflow_dispatch:"
  "permissions:"
  "contents: read"
  "pages: write"
  "id-token: write"
  "concurrency:"
  "group: pages"
  "cancel-in-progress: false"
  "jobs:"
  "build:"
  "runs-on: ubuntu-latest"
  "steps:"
  "actions/checkout@v4"
  "actions/setup-node@v4"
  "node-version-file: .nvmrc"
  "cache: npm"
  "actions/configure-pages@v5"
  "npm ci"
  "npm run build"
  "actions/upload-pages-artifact@v3"
  "path: ./out"
  "deploy:"
  "needs: build"
  "environment:"
  "name: github-pages"
  "url:"
  "steps:"
  "actions/deploy-pages@v4"
  "id: deployment"
)

for element in "${REQUIRED_ELEMENTS[@]}"; do
  if grep -q "$element" "$WORKFLOW_PATH"; then
    echo "  ✓ Found: $element"
  else
    echo "  ✗ Missing: $element"
    echo "FAIL: Missing required element in workflow"
    exit 1
  fi
done

echo "PASS: All required elements found in $WORKFLOW_PATH"