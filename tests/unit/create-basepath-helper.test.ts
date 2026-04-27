import { BASE_PATH, withBasePath } from "src/lib/basePath";

describe("basePath helper", () => {
  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  describe("withBasePath", () => {
    it("prepends BASE_PATH to a path without leading slash", () => {
      const result = withBasePath("profile.png");
      expect(result).toBe("/ralph-node-resume/profile.png");
    });

    it("prepends BASE_PATH to a path with leading slash", () => {
      const result = withBasePath("/profile.png");
      expect(result).toBe("/ralph-node-resume/profile.png");
    });

    it("returns BASE_PATH itself when given empty string", () => {
      const result = withBasePath("");
      expect(result).toBe("/ralph-node-resume/");
    });
  });
});
