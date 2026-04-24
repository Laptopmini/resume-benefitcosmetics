#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
GITIGNORE="$ROOT/.gitignore"

fail() { echo "FAIL: $1" >&2; exit 1; }

[ -f "$GITIGNORE" ] || fail ".gitignore not found"

grep -q '\.next/' "$GITIGNORE" || fail ".gitignore missing .next/"
grep -q 'out/' "$GITIGNORE" || fail ".gitignore missing out/"
grep -q 'next-env\.d\.ts' "$GITIGNORE" || fail ".gitignore missing next-env.d.ts"

echo "PASS: update-gitignore"
