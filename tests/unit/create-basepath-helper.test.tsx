import { BASE_PATH, withBasePath } from "@/src/lib/basePath";

describe("src/lib/basePath", () => {
  test("BASE_PATH equals /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  test("withBasePath prepends base path to absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  test("withBasePath prepends base path to relative path (no leading slash)", () => {
    expect(withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  test("withBasePath handles root path", () => {
    expect(withBasePath("/")).toBe("/ralph-node-resume/");
  });
});
