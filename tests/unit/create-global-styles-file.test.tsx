import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("global styles file", () => {
  const filePath = join(process.cwd(), "app", "globals.css");
  let content: string;

  beforeEach(() => {
    content = readFileSync(filePath, "utf-8");
  });

  it("app/globals.css exists", () => {
    expect(existsSync(filePath)).toBe(true);
  });

  it("imports tailwindcss", () => {
    expect(content).toMatch(/@import\s+["']tailwindcss["']/);
  });

  it("defines --font-sans with Inter", () => {
    expect(content).toContain("--font-sans");
    expect(content).toMatch(/Inter/);
  });

  it("defines neutral palette tokens", () => {
    expect(content).toContain("--color-bg");
    expect(content).toContain("--color-fg");
    expect(content).toContain("--color-muted");
    expect(content).toContain("--color-subtle");
    expect(content).toContain("--color-border");
  });

  it("sets smooth scroll behavior on html", () => {
    expect(content).toMatch(/scroll-behavior:\s*smooth/);
  });

  it("defines .section-pad utility class", () => {
    expect(content).toContain(".section-pad");
  });
});
