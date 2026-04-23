import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("src/components/Section.tsx", () => {
  const sectionPath = path.resolve(__dirname, "../../src/components/Section.tsx");

  test("Section.tsx file exists", () => {
    expect(fs.existsSync(sectionPath)).toBe(true);
  });

  test("renders a section element with id and data-testid", () => {
    const content = fs.readFileSync(sectionPath, "utf8");
    expect(content).toMatch(/data-testid/);
    expect(content).toMatch(/<section/);
  });

  test("applies section-pad class", () => {
    const content = fs.readFileSync(sectionPath, "utf8");
    expect(content).toContain("section-pad");
  });

  test("accepts id, title, testId, and children props", () => {
    const content = fs.readFileSync(sectionPath, "utf8");
    expect(content).toMatch(/id/);
    expect(content).toMatch(/title/);
    expect(content).toMatch(/testId/);
    expect(content).toMatch(/children/);
  });

  test("conditionally renders h2 title with testId suffix", () => {
    const content = fs.readFileSync(sectionPath, "utf8");
    expect(content).toMatch(/<h2/);
    expect(content).toMatch(/title/);
  });

  test("h2 uses large typography classes", () => {
    const content = fs.readFileSync(sectionPath, "utf8");
    expect(content).toMatch(/text-4xl/);
    expect(content).toMatch(/tracking-tight/);
  });
});
