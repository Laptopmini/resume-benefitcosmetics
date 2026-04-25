import * as fs from "node:fs";
import * as path from "node:path";

describe("global styles", () => {
  const cssPath = path.resolve(__dirname, "../../app/globals.css");

  let css: string;

  beforeEach(() => {
    css = fs.readFileSync(cssPath, "utf-8");
  });

  it("app/globals.css exists", () => {
    expect(fs.existsSync(cssPath)).toBe(true);
  });

  it("imports tailwindcss", () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it("defines @theme block", () => {
    expect(css).toContain("@theme");
  });

  it("defines --font-sans with Inter", () => {
    expect(css).toMatch(/--font-sans:.*Inter/);
  });

  it("defines color tokens", () => {
    expect(css).toContain("--color-bg");
    expect(css).toContain("--color-fg");
    expect(css).toContain("--color-muted");
    expect(css).toContain("--color-subtle");
    expect(css).toContain("--color-border");
  });

  it("sets smooth scroll behavior on html", () => {
    expect(css).toMatch(/scroll-behavior:\s*smooth/);
  });

  it("defines .section-pad utility class", () => {
    expect(css).toContain(".section-pad");
  });
});
