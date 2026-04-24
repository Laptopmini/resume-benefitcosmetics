#!/bin/bash
set -e

# Update gitignore task — verify .next/, out/, next-env.d.ts are in .gitignore

ITEMS=(".next/" "out/" "next-env.d.ts")
MISSING=""

for item in "${ITEMS[@]}"; do
  if ! grep -q "$item" .gitignore 2>/dev/null; then
    MISSING="$MISSING $item"
  fi
done

if [ -n "$MISSING" ]; then
  echo "FAIL: .gitignore missing entries:$MISSING"
  exit 1
fi

echo "PASS: .gitignore contains all required entries"
exit 0