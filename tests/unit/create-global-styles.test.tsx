import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("app/globals.css", () => {
  const cssContent = readFileSync(join(process.cwd(), "app/globals.css"), "utf-8");

  it('contains @import "tailwindcss"', () => {
    expect(cssContent).toContain('@import "tailwindcss"');
  });

  it("defines --font-sans in @theme block", () => {
    expect(cssContent).toContain("--font-sans");
    expect(cssContent).toContain('"Inter"');
  });

  it("defines neutral palette tokens in @theme block", () => {
    expect(cssContent).toContain("--color-bg: #ffffff");
    expect(cssContent).toContain("--color-fg: #0a0a0a");
    expect(cssContent).toContain("--color-muted: #6b7280");
    expect(cssContent).toContain("--color-subtle: #f5f5f7");
    expect(cssContent).toContain("--color-border: #e5e5ea");
  });

  it("applies smooth scroll behavior via html selector", () => {
    expect(cssContent).toContain("html");
    expect(cssContent).toContain("scroll-behavior: smooth");
  });

  it("defines .section-pad utility class", () => {
    expect(cssContent).toContain(".section-pad");
    expect(cssContent).toContain("py-24");
    expect(cssContent).toContain("md:py-32");
    expect(cssContent).toContain("px-6");
    expect(cssContent).toContain("md:px-12");
    expect(cssContent).toContain("max-w-6xl");
    expect(cssContent).toContain("mx-auto");
  });
});
