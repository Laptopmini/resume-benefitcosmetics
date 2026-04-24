#!/bin/bash
set -e

# Verify src/components/Nav.tsx exists
if [ ! -f "src/components/Nav.tsx" ]; then
  echo "FAIL: src/components/Nav.tsx does not exist"
  exit 1
fi

# Verify 'use client' directive
if ! grep -q "'use client'" src/components/Nav.tsx; then
  echo "FAIL: 'use client' directive not found"
  exit 1
fi

# Verify data-testid="nav"
if ! grep -q 'data-testid="nav"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav\" not found"
  exit 1
fi

# Verify data-testid="nav-brand"
if ! grep -q 'data-testid="nav-brand"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-brand\" not found"
  exit 1
fi

# Verify nav link data-testids
if ! grep -q 'data-testid="nav-link-profile"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-link-profile\" not found"
  exit 1
fi

if ! grep -q 'data-testid="nav-link-skills"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-link-skills\" not found"
  exit 1
fi

if ! grep -q 'data-testid="nav-link-experience"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-link-experience\" not found"
  exit 1
fi

if ! grep -q 'data-testid="nav-link-education"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-link-education\" not found"
  exit 1
fi

# Verify nav-toggle data-testid (hamburger button)
if ! grep -q 'data-testid="nav-toggle"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-toggle\" not found"
  exit 1
fi

# Verify nav-menu data-testid (dropdown panel)
if ! grep -q 'data-testid="nav-menu"' src/components/Nav.tsx; then
  echo "FAIL: data-testid=\"nav-menu\" not found"
  exit 1
fi

# Verify anchor links to sections
if ! grep -q '#profile' src/components/Nav.tsx; then
  echo "FAIL: #profile anchor link not found"
  exit 1
fi

if ! grep -q '#skills' src/components/Nav.tsx; then
  echo "FAIL: #skills anchor link not found"
  exit 1
fi

if ! grep -q '#experience' src/components/Nav.tsx; then
  echo "FAIL: #experience anchor link not found"
  exit 1
fi

if ! grep -q '#education' src/components/Nav.tsx; then
  echo "FAIL: #education anchor link not found"
  exit 1
fi

echo "PASS: src/components/Nav.tsx created with correct structure and testids"