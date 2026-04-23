import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("app/layout.tsx", () => {
  const layoutPath = path.resolve(__dirname, "../../app/layout.tsx");

  test("layout.tsx file exists", () => {
    expect(fs.existsSync(layoutPath)).toBe(true);
  });

  test("imports globals.css", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toMatch(/import\s+["']\.\/globals\.css["']/);
  });

  test("loads Inter font from next/font/google", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toContain("next/font/google");
    expect(content).toContain("Inter");
  });

  test("renders html with lang=en", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toMatch(/lang=["']en["']/);
  });

  test("renders body with data-testid app-body", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toMatch(/data-testid=["']app-body["']/);
  });

  test("includes Nav component", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toContain("<Nav");
  });

  test("exports metadata with correct title", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toContain("Paul-Valentin Mini");
    expect(content).toMatch(/metadata/);
  });

  test("renders children", () => {
    const content = fs.readFileSync(layoutPath, "utf8");
    expect(content).toContain("children");
  });
});
