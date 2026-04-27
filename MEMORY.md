Fixed jest.config.mjs moduleNameMapper to add "^@/src/(.*)$" entry before the existing "@" catch-all, so that paths starting with @/src/ resolve correctly to src/ directory.
