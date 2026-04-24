import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const CONFIG_PATH = join(ROOT, "postcss.config.mjs");

describe("postcss.config.mjs", () => {
  it("file exists", () => {
    expect(existsSync(CONFIG_PATH)).toBe(true);
  });

  it("exports correct plugin configuration", async () => {
    const config = await import(CONFIG_PATH);
    const c = config.default || config;

    expect(c.plugins).toBeDefined();
    expect(c.plugins["@tailwindcss/postcss"]).toEqual({});
  });
});
