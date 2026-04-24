#!/bin/bash
set -e

# Verify src/components/Section.tsx exists
if [ ! -f "src/components/Section.tsx" ]; then
  echo "FAIL: src/components/Section.tsx does not exist"
  exit 1
fi

# Verify it accepts id, title?, testId, children props
if ! grep -q 'id:' src/components/Section.tsx; then
  echo "FAIL: id prop not found"
  exit 1
fi

if ! grep -q 'testId:' src/components/Section.tsx; then
  echo "FAIL: testId prop not found"
  exit 1
fi

# Verify section element with id and data-testid
if ! grep -q '<section' src/components/Section.tsx; then
  echo "FAIL: <section> element not found"
  exit 1
fi

# Verify section-pad class
if ! grep -q 'section-pad' src/components/Section.tsx; then
  echo "FAIL: section-pad class not found"
  exit 1
fi

# Verify h2 title rendering when title is provided
if ! grep -q 'title' src/components/Section.tsx; then
  echo "FAIL: title handling not found"
  exit 1
fi

# Verify React.ReactNode children type
if ! grep -q 'React.ReactNode' src/components/Section.tsx; then
  echo "FAIL: React.ReactNode children type not found"
  exit 1
fi

echo "PASS: src/components/Section.tsx created with correct structure"