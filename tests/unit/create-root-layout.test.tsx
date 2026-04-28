import "./setup";

describe("RootLayout", () => {
  it("loads without error", async () => {
    const mod = await import("@/app/layout");
    expect(mod.default).toBeDefined();
  });
});
