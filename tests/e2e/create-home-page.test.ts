import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("app/page.tsx", () => {
  const pagePath = path.resolve(__dirname, "../../app/page.tsx");

  test("page.tsx file exists", () => {
    expect(fs.existsSync(pagePath)).toBe(true);
  });

  test("renders main with data-testid home", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toMatch(/data-testid=["']home["']/);
    expect(content).toMatch(/<main/);
  });

  test("contains section-hero stub", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain("section-hero");
  });

  test("contains section-profile stub", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain("section-profile");
  });

  test("contains section-skills stub", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain("section-skills");
  });

  test("contains section-experience stub", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain("section-experience");
  });

  test("contains section-education stub", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain("section-education");
  });

  test("uses Section component", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toMatch(/<Section/);
  });

  test("section IDs map to correct anchors", () => {
    const content = fs.readFileSync(pagePath, "utf8");
    expect(content).toContain('"hero"');
    expect(content).toContain('"profile"');
    expect(content).toContain('"skills"');
    expect(content).toContain('"experience"');
    expect(content).toContain('"education"');
  });
});
