import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create app layout with Nav", () => {
  const layoutFile = join(process.cwd(), "app", "layout.tsx");

  it("app/layout.tsx should exist on disk", () => {
    expect(existsSync(layoutFile)).toBe(true);
  });

  it("should export a default RootLayout function", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("export default function RootLayout");
    expect(content).toContain("children");
  });

  it('should render <html lang="en">', () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain('lang="en"');
  });

  it("should import and use Inter from next/font/google", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("next/font/google");
    expect(content).toContain("Inter");
    expect(content).toContain("subsets");
    expect(content).toContain("latin");
  });

  it("should apply Inter className to <html>", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("className");
    expect(content).toContain("<html");
  });

  it('should render <body> with data-testid="app-body"', () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain('data-testid="app-body"');
    expect(content).toContain("<body");
  });

  it("should render <Nav /> and {children} inside body", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("<Nav");
    expect(content).toContain("</Nav>");
    expect(content).toContain("{children}");
  });

  it("should import globals.css", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("./globals.css");
  });

  it("should export metadata with title and description", () => {
    const content = readFileSync(layoutFile, "utf-8");
    expect(content).toContain("export const metadata");
    expect(content).toContain("title");
    expect(content).toContain("description");
    expect(content).toContain("Paul-Valentin Mini");
    expect(content).toContain("Senior Software Developer");
  });
});
