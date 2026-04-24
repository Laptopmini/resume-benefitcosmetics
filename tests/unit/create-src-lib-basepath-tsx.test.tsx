import { describe, expect, it } from "@jest/globals";

// Mock the file system check - these tests will fail until the task is implemented
describe("create-src-lib-basepath-tsx", () => {
  it("exports BASE_PATH constant", async () => {
    const { BASE_PATH } = await import("../../src/lib/basePath").catch(() => {
      throw new Error("src/lib/basePath.ts does not exist or has no exports");
    });
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("withBasePath helper prepends BASE_PATH to paths", async () => {
    const { withBasePath } = await import("../../src/lib/basePath").catch(() => {
      throw new Error("src/lib/basePath.ts does not exist or has no exports");
    });
    expect(withBasePath("/assets/image.png")).toBe("/ralph-node-resume/assets/image.png");
    expect(withBasePath("relative/path")).toBe("/ralph-node-resume/relative/path");
  });

  it("withBasePath handles paths that already start with /", async () => {
    const { withBasePath } = await import("../../src/lib/basePath").catch(() => {
      throw new Error("src/lib/basePath.ts does not exist or has no exports");
    });
    expect(withBasePath("/absolute/path")).toBe("/ralph-node-resume/absolute/path");
  });
});
