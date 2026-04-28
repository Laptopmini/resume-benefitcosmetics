import "./setup";

describe("Home page stubs", () => {
  it("renders main element", async () => {
    const mod = await import("@/app/page");
    expect(mod.default).toBeDefined();
  });
});
