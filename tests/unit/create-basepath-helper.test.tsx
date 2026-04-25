import { BASE_PATH, withBasePath } from "@/src/lib/basePath";

describe("basePath helper", () => {
  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  it("withBasePath prepends base path to absolute path", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("withBasePath prepends base path to relative path (adds leading slash)", () => {
    expect(withBasePath("images/photo.jpg")).toBe("/ralph-node-resume/images/photo.jpg");
  });

  it("withBasePath handles root path", () => {
    expect(withBasePath("/")).toBe("/ralph-node-resume/");
  });
});
