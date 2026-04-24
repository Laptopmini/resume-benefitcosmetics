import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create basePath helper", () => {
  const basePathFile = join(process.cwd(), "src", "lib", "basePath.ts");

  it("src/lib/basePath.ts should exist on disk", () => {
    expect(existsSync(basePathFile)).toBe(true);
  });

  it("should export BASE_PATH constant as /ralph-node-resume", () => {
    const content = readFileSync(basePathFile, "utf-8");
    expect(content).toContain("BASE_PATH = '/ralph-node-resume'");
  });

  it("should export withBasePath helper function", () => {
    const content = readFileSync(basePathFile, "utf-8");
    expect(content).toContain("withBasePath");
  });

  it("withBasePath should be a function that prepends BASE_PATH", () => {
    // Dynamic import to test the actual function
    const { BASE_PATH, withBasePath } = require(basePathFile);
    expect(BASE_PATH).toBe("/ralph-node-resume");

    // Test withBasePath adds BASE_PATH to paths
    expect(withBasePath("/skills")).toBe("/ralph-node-resume/skills");

    // Test withBasePath handles paths without leading slash
    expect(withBasePath("skills")).toBe("/ralph-node-resume/skills");
  });

  it("withBasePath should handle already-prefixed paths correctly", () => {
    const { withBasePath } = require(basePathFile);
    // Path already has BASE_PATH
    expect(withBasePath("/ralph-node-resume/skills")).toBe(
      "/ralph-node-resume/ralph-node-resume/skills",
    );
  });
});
