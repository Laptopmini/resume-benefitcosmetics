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
    "^@/app/(.*)$": "<rootDir>/app/$1",
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/font/google$": "<rootDir>/tests/__mocks__/nextFontGoogle.js",
    "^next/image$": "<rootDir>/tests/__mocks__/next/image.tsx",
    "^framer-motion$": "<rootDir>/tests/__mocks__/framer-motion.tsx",
    "\\.css$": "<rootDir>/tests/__mocks__/globals.css.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};

export default config;
