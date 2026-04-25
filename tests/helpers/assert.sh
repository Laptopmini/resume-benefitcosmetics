#!/usr/bin/env bash
# Shared assertion helpers for shell validation scripts.
# Source this file — do not execute directly.
# Requires: set -euo pipefail in the calling script.

PASS=0
FAIL=0

_pass() {
  echo "PASS: $1"
  PASS=$((PASS + 1))
}

_fail() {
  echo "FAIL: $1"
  FAIL=$((FAIL + 1))
}

assert() {
  local desc="$1"; shift
  if "$@" >/dev/null 2>&1; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_grep() {
  local desc="$1" pattern="$2" file="$3"
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found: $file)"
    return 0
  fi
  if grep -qF -- "$pattern" "$file" 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_grep_regex() {
  local desc="$1" pattern="$2" file="$3"
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found: $file)"
    return 0
  fi
  if grep -q -- "$pattern" "$file" 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

assert_json() {
  local desc="$1" query="$2" file="$3"
  if ! command -v node >/dev/null 2>&1; then
    _fail "$desc (node not installed)"
    return 0
  fi
  if [ ! -f "$file" ]; then
    _fail "$desc (file not found: $file)"
    return 0
  fi
  if node -e "const _=require('./$file'); if(!($query)) process.exit(1);" 2>/dev/null; then
    _pass "$desc"
  else
    _fail "$desc"
  fi
}

report_results() {
  echo ""
  echo "Results: $PASS passed, $FAIL failed"
  if [ "$FAIL" -ne 0 ]; then
    exit 1
  fi
}
