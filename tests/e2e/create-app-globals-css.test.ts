import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("app/globals.css", () => {
  const cssPath = path.resolve(__dirname, "../../app/globals.css");

  test("globals.css file exists", () => {
    expect(fs.existsSync(cssPath)).toBe(true);
  });

  test("imports tailwindcss", () => {
    const content = fs.readFileSync(cssPath, "utf8");
    expect(content).toContain('@import "tailwindcss"');
  });

  test("defines @theme block with font-sans", () => {
    const content = fs.readFileSync(cssPath, "utf8");
    expect(content).toContain("@theme");
    expect(content).toMatch(/--font-sans/);
    expect(content).toMatch(/Inter/);
  });

  test("defines color tokens", () => {
    const content = fs.readFileSync(cssPath, "utf8");
    expect(content).toContain("--color-bg");
    expect(content).toContain("--color-fg");
    expect(content).toContain("--color-muted");
    expect(content).toContain("--color-subtle");
    expect(content).toContain("--color-border");
  });

  test("sets smooth scroll behavior on html", () => {
    const content = fs.readFileSync(cssPath, "utf8");
    expect(content).toMatch(/scroll-behavior:\s*smooth/);
  });

  test("defines .section-pad utility class", () => {
    const content = fs.readFileSync(cssPath, "utf8");
    expect(content).toContain(".section-pad");
  });
});
