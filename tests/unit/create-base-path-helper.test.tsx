import { BASE_PATH, withBasePath } from "../../src/lib/basePath";

describe("basePath helper", () => {
  it("exports BASE_PATH constant", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  describe("withBasePath", () => {
    it("appends path without leading slash", () => {
      expect(withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
    });

    it("appends path with leading slash", () => {
      expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
    });

    it("handles empty string", () => {
      expect(withBasePath("")).toBe("/ralph-node-resume/");
    });

    it('returns BASE_PATH when given just "/"', () => {
      expect(withBasePath("/")).toBe("/ralph-node-resume/");
    });
  });
});
