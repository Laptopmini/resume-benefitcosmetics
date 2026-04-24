#!/bin/bash
set -e

# Verify app/page.tsx exists
if [ ! -f "app/page.tsx" ]; then
  echo "FAIL: app/page.tsx does not exist"
  exit 1
fi

# Verify main element with data-testid="home"
if ! grep -q 'data-testid="home"' app/page.tsx; then
  echo "FAIL: main data-testid=\"home\" not found"
  exit 1
fi

# Verify Section component is used
if ! grep -q '<Section' app/page.tsx; then
  echo "FAIL: <Section> component not used"
  exit 1
fi

# Verify section testIds
if ! grep -q 'section-hero' app/page.tsx; then
  echo "FAIL: section-hero testId not found"
  exit 1
fi

if ! grep -q 'section-profile' app/page.tsx; then
  echo "FAIL: section-profile testId not found"
  exit 1
fi

if ! grep -q 'section-skills' app/page.tsx; then
  echo "FAIL: section-skills testId not found"
  exit 1
fi

if ! grep -q 'section-experience' app/page.tsx; then
  echo "FAIL: section-experience testId not found"
  exit 1
fi

if ! grep -q 'section-education' app/page.tsx; then
  echo "FAIL: section-education testId not found"
  exit 1
fi

# Verify section ids match anchors
if ! grep -q '#hero' app/page.tsx; then
  echo "FAIL: #hero section id not found"
  exit 1
fi

if ! grep -q '#profile' app/page.tsx; then
  echo "FAIL: #profile section id not found"
  exit 1
fi

echo "PASS: app/page.tsx created with correct section stubs"