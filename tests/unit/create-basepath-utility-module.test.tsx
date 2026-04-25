describe("basePath utility module", () => {
  let mod: typeof import("@/src/lib/basePath");

  beforeEach(async () => {
    mod = await import("@/src/lib/basePath");
  });

  it("exports BASE_PATH as /ralph-node-resume", () => {
    expect(mod.BASE_PATH).toBe("/ralph-node-resume");
  });

  it("exports withBasePath function", () => {
    expect(typeof mod.withBasePath).toBe("function");
  });

  it("withBasePath prepends BASE_PATH to a path starting with /", () => {
    expect(mod.withBasePath("/profile.png")).toBe("/ralph-node-resume/profile.png");
  });

  it("withBasePath prepends BASE_PATH and / to a path without leading /", () => {
    expect(mod.withBasePath("profile.png")).toBe("/ralph-node-resume/profile.png");
  });
});
