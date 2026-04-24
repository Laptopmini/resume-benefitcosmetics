import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create next.config.mjs", () => {
  const configPath = join(process.cwd(), "next.config.mjs");

  it("next.config.mjs should exist on disk", () => {
    expect(existsSync(configPath)).toBe(true);
  });

  it("should export a config with output: export", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("output: 'export'");
  });

  it("should export a config with basePath: /ralph-node-resume", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("basePath: '/ralph-node-resume'");
  });

  it("should export a config with assetPrefix: /ralph-node-resume", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("assetPrefix: '/ralph-node-resume'");
  });

  it("should export a config with images: { unoptimized: true }", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("unoptimized: true");
  });

  it("should export a config with trailingSlash: true", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("trailingSlash: true");
  });

  it("should export a config with reactStrictMode: true", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("reactStrictMode: true");
  });

  it("should be a valid ES module (uses export default)", () => {
    const content = readFileSync(configPath, "utf-8");
    expect(content).toContain("export default");
  });
});
