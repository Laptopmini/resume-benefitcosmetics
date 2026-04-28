import { BASE_PATH, stripBasePath, withBasePath } from "@/lib/basePath";

describe("basePath helpers", () => {
  describe("BASE_PATH", () => {
    it("equals /ralph-node-resume", () => {
      expect(BASE_PATH).toBe("/ralph-node-resume");
    });
  });

  describe("withBasePath", () => {
    it("prepends base path to an absolute path", () => {
      expect(withBasePath("/about")).toBe("/ralph-node-resume/about");
    });

    it("prepends base path to a relative path (adds slash)", () => {
      expect(withBasePath("about")).toBe("/ralph-node-resume/about");
    });

    it("prepends base path to root /", () => {
      expect(withBasePath("/")).toBe("/ralph-node-resume/");
    });
  });

  describe("stripBasePath", () => {
    it("removes leading base path", () => {
      expect(stripBasePath("/ralph-node-resume/about")).toBe("/about");
    });

    it("returns input unchanged when base path is not present", () => {
      expect(stripBasePath("/other/path")).toBe("/other/path");
    });

    it("handles exact base path with no trailing content", () => {
      expect(stripBasePath("/ralph-node-resume")).toBe("");
    });
  });
});
