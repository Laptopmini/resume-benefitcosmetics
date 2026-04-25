/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/unit/**/*.test.{ts,tsx}"],
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/tests/__mocks__/css-stub.ts",
    "^@/(.*)$": "<rootDir>/$1",
    "^next/font/google$": "<rootDir>/tests/__mocks__/next-font-google.ts",
  },
  setupFilesAfterEnv: ["<rootDir>/tests/unit/jest-setup.ts"],
};

export default config;
