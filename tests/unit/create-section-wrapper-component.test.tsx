import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

describe("Create Section wrapper component", () => {
  const sectionFile = join(process.cwd(), "src", "components", "Section.tsx");

  it("src/components/Section.tsx should exist on disk", () => {
    expect(existsSync(sectionFile)).toBe(true);
  });

  it("should export a Section component", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toMatch(/export (default )?function Section|const Section/);
  });

  it("should accept id, title, testId, and children props", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toContain("id");
    expect(content).toContain("testId");
    expect(content).toContain("title");
    expect(content).toContain("children");
  });

  it("should render <section> with id and data-testid attributes", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toContain("<section");
    expect(content).toContain("id=");
    expect(content).toContain("data-testid=");
  });

  it("should apply .section-pad class", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toContain("section-pad");
  });

  it("should conditionally render <h2> with title when provided", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toMatch(/title\s*&&|title\?|if\s*\(title\)/);
    expect(content).toContain("<h2");
  });

  it("should apply large Apple-style typography to title h2", () => {
    const content = readFileSync(sectionFile, "utf-8");
    expect(content).toMatch(/text-4xl|text-5xl|text-6xl/);
    expect(content).toMatch(/md:text-5xl|md:text-6xl|md:text-7xl|md:text-8xl/);
    expect(content).toContain("font-semibold");
    expect(content).toContain("tracking-tight");
    expect(content).toMatch(/mb-1[0-2]|mb-12|mb-16/);
  });
});
