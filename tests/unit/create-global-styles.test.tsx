import * as fs from "node:fs";
import * as path from "node:path";

const CSS_PATH = path.resolve(__dirname, "../../app/globals.css");

describe("app/globals.css", () => {
  let css: string;

  beforeEach(() => {
    css = fs.readFileSync(CSS_PATH, "utf-8");
  });

  test("file exists", () => {
    expect(fs.existsSync(CSS_PATH)).toBe(true);
  });

  test("imports tailwindcss", () => {
    expect(css).toMatch(/@import\s+["']tailwindcss["']/);
  });

  test("defines --font-sans with Inter", () => {
    expect(css).toContain("--font-sans");
    expect(css).toMatch(/Inter/i);
  });

  test("defines neutral palette tokens", () => {
    expect(css).toContain("--color-bg");
    expect(css).toContain("--color-fg");
    expect(css).toContain("--color-muted");
    expect(css).toContain("--color-subtle");
    expect(css).toContain("--color-border");
  });

  test("sets smooth scroll behavior on html", () => {
    expect(css).toMatch(/scroll-behavior:\s*smooth/);
  });

  test("defines .section-pad utility class", () => {
    expect(css).toContain(".section-pad");
  });
});
