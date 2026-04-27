import { BASE_PATH, withBasePath } from "@/lib/basePath";

describe("basePath helper", () => {
  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });

  describe("withBasePath", () => {
    it("appends path to BASE_PATH when path does not start with /", () => {
      expect(withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
    });

    it("appends path to BASE_PATH when path starts with /", () => {
      expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
    });

    it("handles empty string path", () => {
      expect(withBasePath("")).toBe("/ralph-node-resume/");
    });
  });
});
