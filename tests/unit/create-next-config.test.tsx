import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(__dirname, "..", "..");
const CONFIG_PATH = join(ROOT, "next.config.mjs");

describe("next.config.mjs", () => {
  let configContent: string;

  beforeEach(async () => {
    configContent = await readFile(CONFIG_PATH, "utf-8");
  });

  it("file exists", () => {
    expect(existsSync(CONFIG_PATH)).toBe(true);
  });

  it("exports config with required properties", async () => {
    expect(configContent).toContain("output");
    expect(configContent).toContain("export");

    // Dynamically import and validate
    const config = await import(CONFIG_PATH);
    const c = config.default || config;

    expect(c.output).toBe("export");
    expect(c.basePath).toBe("/ralph-node-resume");
    expect(c.assetPrefix).toBe("/ralph-node-resume");
    expect(c.images).toEqual({ unoptimized: true });
    expect(c.trailingSlash).toBe(true);
    expect(c.reactStrictMode).toBe(true);
  });
});
