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
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/unit/**/*.test.{ts,tsx}"],
  roots: ["<rootDir>/tests"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^next/font/google$": "<rootDir>/tests/__mocks__/nextFontGoogle.js",
    "\\.css$": "<rootDir>/tests/__mocks__/globals.css.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
