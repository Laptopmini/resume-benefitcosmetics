import "./setup";

describe("globals.css", () => {
  const fs = require("node:fs");
  const path = require("node:path");

  it("file exists at app/globals.css", () => {
    const filePath = path.join(process.cwd(), "app/globals.css");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('contains @import "tailwindcss"', () => {
    const filePath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain('@import "tailwindcss"');
  });

  it("contains @theme block with font-sans", () => {
    const filePath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("--font-sans");
    expect(content).toContain('"Inter"');
  });

  it("contains neutral palette tokens", () => {
    const filePath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("--color-bg");
    expect(content).toContain("--color-fg");
    expect(content).toContain("--color-muted");
    expect(content).toContain("--color-subtle");
    expect(content).toContain("--color-border");
  });

  it("contains section-pad utility class", () => {
    const filePath = path.join(process.cwd(), "app/globals.css");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain(".section-pad");
  });
});
