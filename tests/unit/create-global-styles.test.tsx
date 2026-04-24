import { readFileSync } from "fs";
import { join } from "path";

describe("global styles", () => {
  const cssPath = join(process.cwd(), "app", "globals.css");
  let css: string;

  beforeEach(() => {
    css = readFileSync(cssPath, "utf8");
  });

  it("app/globals.css exists", () => {
    expect(() => readFileSync(cssPath, "utf8")).not.toThrow();
  });

  it('contains @import "tailwindcss"', () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it("defines --font-sans with Inter in @theme", () => {
    expect(css).toMatch(/--font-sans:\s*["']Inter["']/);
  });

  it("defines neutral palette tokens", () => {
    expect(css).toMatch(/--color-bg:\s*#ffffff/);
    expect(css).toMatch(/--color-fg:\s*#0a0a0a/);
    expect(css).toMatch(/--color-muted:\s*#6b7280/);
    expect(css).toMatch(/--color-subtle:\s*#f5f5f7/);
    expect(css).toMatch(/--color-border:\s*#e5e5ea/);
  });

  it("defines html scroll-behavior: smooth", () => {
    expect(css).toMatch(/html\s*\{[^}]*scroll-behavior:\s*smooth/);
  });

  it("defines .section-pad utility class", () => {
    expect(css).toMatch(/\.section-pad\s*\{[^}]*py-24/);
  });
});
