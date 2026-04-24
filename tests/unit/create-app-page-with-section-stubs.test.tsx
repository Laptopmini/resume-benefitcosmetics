import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create app page with Section stubs", () => {
  const pageFile = join(process.cwd(), "app", "page.tsx");

  it("app/page.tsx should exist on disk", () => {
    expect(existsSync(pageFile)).toBe(true);
  });

  it('should be a server component (no "use client" directive)', () => {
    const content = readFileSync(pageFile, "utf-8");
    expect(content).not.toContain("'use client'");
    expect(content).not.toContain('"use client"');
  });

  it('should render <main> with data-testid="home"', () => {
    const content = readFileSync(pageFile, "utf-8");
    expect(content).toContain("<main");
    expect(content).toContain('data-testid="home"');
  });

  it("should render Section stubs for hero, profile, skills, experience, education", () => {
    const content = readFileSync(pageFile, "utf-8");
    expect(content).toContain("Section");
    expect(content).toContain("section-hero");
    expect(content).toContain("section-profile");
    expect(content).toContain("section-skills");
    expect(content).toContain("section-experience");
    expect(content).toContain("section-education");
  });

  it("should have id props on Section stubs for hero, profile, skills, experience, education", () => {
    const content = readFileSync(pageFile, "utf-8");
    expect(content).toContain('id="hero"');
    expect(content).toContain('id="profile"');
    expect(content).toContain('id="skills"');
    expect(content).toContain('id="experience"');
    expect(content).toContain('id="education"');
  });

  it("should have distinct testId values for each Section", () => {
    const content = readFileSync(pageFile, "utf-8");
    // Count unique testId values
    const testIdMatches = content.match(/testId="[^"]+"/g) || [];
    const uniqueTestIds = new Set(testIdMatches);
    expect(uniqueTestIds.size).toBeGreaterThanOrEqual(5);
  });

  it("should import Section component from src/components/Section", () => {
    const content = readFileSync(pageFile, "utf-8");
    expect(content).toContain("Section");
    expect(content).toMatch(/from\s+['"]\.\/|\/Section/);
  });
});
