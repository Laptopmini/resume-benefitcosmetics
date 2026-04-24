#!/bin/bash
set -e

# Verify app/globals.css exists
if [ ! -f "app/globals.css" ]; then
  echo "FAIL: app/globals.css does not exist"
  exit 1
fi

# Verify @import "tailwindcss"
if ! grep -q '@import "tailwindcss"' app/globals.css; then
  echo "FAIL: @import \"tailwindcss\" not found"
  exit 1
fi

# Verify @theme block exists
if ! grep -q '@theme' app/globals.css; then
  echo "FAIL: @theme block not found"
  exit 1
fi

# Verify --font-sans is defined
if ! grep -q -- '--font-sans' app/globals.css; then
  echo "FAIL: --font-sans not defined in @theme"
  exit 1
fi

# Verify color tokens are defined
if ! grep -q -- '--color-bg' app/globals.css; then
  echo "FAIL: --color-bg not defined in @theme"
  exit 1
fi

if ! grep -q -- '--color-fg' app/globals.css; then
  echo "FAIL: --color-fg not defined in @theme"
  exit 1
fi

if ! grep -q -- '--color-muted' app/globals.css; then
  echo "FAIL: --color-muted not defined in @theme"
  exit 1
fi

if ! grep -q -- '--color-subtle' app/globals.css; then
  echo "FAIL: --color-subtle not defined in @theme"
  exit 1
fi

if ! grep -q -- '--color-border' app/globals.css; then
  echo "FAIL: --color-border not defined in @theme"
  exit 1
fi

# Verify .section-pad class exists
if ! grep -q '.section-pad' app/globals.css; then
  echo "FAIL: .section-pad class not found"
  exit 1
fi

# Verify html scroll-behavior: smooth
if ! grep -q 'scroll-behavior: smooth' app/globals.css; then
  echo "FAIL: scroll-behavior: smooth not found for html"
  exit 1
fi

echo "PASS: app/globals.css created with required Tailwind v4 setup"