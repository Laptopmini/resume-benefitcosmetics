import * as fs from "node:fs";
import * as path from "node:path";

const CSS_PATH = path.resolve(__dirname, "../../app/globals.css");

describe("app/globals.css", () => {
  let css: string;

  beforeAll(() => {
    css = fs.readFileSync(CSS_PATH, "utf-8");
  });

  test("file exists", () => {
    expect(fs.existsSync(CSS_PATH)).toBe(true);
  });

  test("imports tailwindcss", () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']/);
  });

  test("defines --font-sans with Inter", () => {
    expect(css).toMatch(/--font-sans/);
    expect(css).toMatch(/Inter/);
  });

  test("defines neutral palette tokens", () => {
    expect(css).toMatch(/--color-bg/);
    expect(css).toMatch(/--color-fg/);
    expect(css).toMatch(/--color-muted/);
    expect(css).toMatch(/--color-subtle/);
    expect(css).toMatch(/--color-border/);
  });

  test("sets smooth scroll behavior on html", () => {
    expect(css).toMatch(/scroll-behavior:\s*smooth/);
  });

  test("defines .section-pad utility class", () => {
    expect(css).toMatch(/\.section-pad/);
  });

  test("has @theme block", () => {
    expect(css).toMatch(/@theme/);
  });
});
