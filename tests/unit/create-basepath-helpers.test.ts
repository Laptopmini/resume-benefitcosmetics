import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("src/lib/basePath", () => {
  describe("BASE_PATH", () => {
    it("exports the correct base path constant", () => {
      expect(BASE_PATH).toBe("/ralph-node-resume");
    });
  });

  describe("withBasePath", () => {
    it("prepends base path to an absolute path", () => {
      expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
    });

    it("prepends base path to a relative path (no leading slash)", () => {
      expect(withBasePath("images/photo.jpg")).toBe("/ralph-node-resume/images/photo.jpg");
    });

    it("handles root path", () => {
      expect(withBasePath("/")).toBe("/ralph-node-resume/");
    });

    it("returns a string", () => {
      expect(typeof withBasePath("/test")).toBe("string");
    });
  });
});
