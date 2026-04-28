import { BASE_PATH, withBasePath } from "@/lib/basePath";

describe("BASE_PATH", () => {
  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(BASE_PATH).toBe("/ralph-node-resume");
  });
});

describe("withBasePath", () => {
  it("appends path to BASE_PATH", () => {
    expect(withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("prepends / to path without leading slash", () => {
    expect(withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("handles path that already starts with BASE_PATH", () => {
    // The function should still double-append since it unconditionally prepends
    expect(withBasePath("/ralph-node-resume/profile.png")).toBe(
      "/ralph-node-resume/ralph-node-resume/profile.png",
    );
  });
});
