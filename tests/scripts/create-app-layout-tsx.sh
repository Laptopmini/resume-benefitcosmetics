#!/bin/bash
set -e

# Verify app/layout.tsx exists
if [ ! -f "app/layout.tsx" ]; then
  echo "FAIL: app/layout.tsx does not exist"
  exit 1
fi

# Verify Inter font import from next/font/google
if ! grep -q "from 'next/font/google'" app/layout.tsx; then
  echo "FAIL: Inter font not imported from next/font/google"
  exit 1
fi

if ! grep -q 'subsets: \[.latin.\]' app/layout.tsx; then
  echo "FAIL: Inter font not configured with subsets: ['latin']"
  exit 1
fi

# Verify html lang="en"
if ! grep -q 'lang="en"' app/layout.tsx; then
  echo "FAIL: html lang=\"en\" not found"
  exit 1
fi

# Verify body with data-testid="app-body"
if ! grep -q 'data-testid="app-body"' app/layout.tsx; then
  echo "FAIL: body data-testid=\"app-body\" not found"
  exit 1
fi

# Verify Nav component imported/rendered
if ! grep -q '<Nav' app/layout.tsx; then
  echo "FAIL: Nav component not rendered in layout"
  exit 1
fi

# Verify Inter className on html
if ! grep -q "className" app/layout.tsx; then
  echo "FAIL: className not found for Inter font"
  exit 1
fi

# Verify metadata export
if ! grep -q 'export const metadata' app/layout.tsx; then
  echo "FAIL: metadata export not found"
  exit 1
fi

# Verify title
if ! grep -q 'title' app/layout.tsx; then
  echo "FAIL: title not found in metadata"
  exit 1
fi

# Verify globals.css imported
if ! grep -q './globals.css' app/layout.tsx; then
  echo "FAIL: globals.css not imported"
  exit 1
fi

echo "PASS: app/layout.tsx created with correct Next.js App Router setup"