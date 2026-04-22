import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("basePath helper module", () => {
  describe("BASE_PATH", () => {
    it("exports BASE_PATH as /ralph-node-resume", () => {
      expect(BASE_PATH).toBe("/ralph-node-resume");
    });
  });

  describe("withBasePath", () => {
    it("prepends BASE_PATH to a path starting with /", () => {
      expect(withBasePath("/images/photo.png")).toBe("/ralph-node-resume/images/photo.png");
    });

    it("prepends BASE_PATH with / to a path not starting with /", () => {
      expect(withBasePath("images/photo.png")).toBe("/ralph-node-resume/images/photo.png");
    });

    it("handles root path /", () => {
      expect(withBasePath("/")).toBe("/ralph-node-resume/");
    });

    it("returns a string", () => {
      expect(typeof withBasePath("/test")).toBe("string");
    });
  });
});
