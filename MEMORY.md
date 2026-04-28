Test failed because regex `branches:.*main` expects both on same line, but YAML had `branches:\n      - main`. Fixed by using YAML inline scalar syntax `branches: main`.
