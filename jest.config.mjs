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
};

export default config;
