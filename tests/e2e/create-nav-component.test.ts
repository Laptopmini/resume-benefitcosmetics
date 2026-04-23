import * as fs from "node:fs";
import * as path from "node:path";
import { expect, test } from "@playwright/test";

test.describe("src/components/Nav.tsx", () => {
  const navPath = path.resolve(__dirname, "../../src/components/Nav.tsx");

  test("Nav.tsx file exists", () => {
    expect(fs.existsSync(navPath)).toBe(true);
  });

  test("is a client component", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/["']use client["']/);
  });

  test("has nav data-testid", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/data-testid=["']nav["']/);
  });

  test("has brand data-testid with name", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/data-testid=["']nav-brand["']/);
    expect(content).toContain("Paul-Valentin Mini");
  });

  test("has anchor links for all sections", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/data-testid=["']nav-link-profile["']/);
    expect(content).toMatch(/data-testid=["']nav-link-skills["']/);
    expect(content).toMatch(/data-testid=["']nav-link-experience["']/);
    expect(content).toMatch(/data-testid=["']nav-link-education["']/);
    expect(content).toContain("#profile");
    expect(content).toContain("#skills");
    expect(content).toContain("#experience");
    expect(content).toContain("#education");
  });

  test("has mobile hamburger toggle", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/data-testid=["']nav-toggle["']/);
  });

  test("has mobile nav menu", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/data-testid=["']nav-menu["']/);
  });

  test("uses sticky positioning", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/sticky/);
  });

  test("uses backdrop blur styling", () => {
    const content = fs.readFileSync(navPath, "utf8");
    expect(content).toMatch(/backdrop-blur|backdrop.*blur/);
  });
});
