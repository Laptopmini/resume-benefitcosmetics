import { existsSync } from "node:fs";
import { join } from "node:path";

describe("Create resume data module", () => {
  const resumeFile = join(process.cwd(), "src", "content", "resume.ts");

  it("src/content/resume.ts should exist on disk", () => {
    expect(existsSync(resumeFile)).toBe(true);
  });

  it("should export profile with required fields", () => {
    const { profile } = require(resumeFile);
    expect(profile).toBeDefined();
    expect(profile.name).toBe("Paul-Valentin Mini");
    expect(profile.title).toBeDefined();
    expect(profile.tagline).toBeDefined();
    expect(profile.location).toBe("San Francisco, CA");
    expect(profile.email).toBe("paul@emini.com");
    expect(profile.phone).toBe("(415) 694-3616");
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
    expect(profile.github).toBe("https://github.com/Laptopmini");
    expect(profile.summary).toBeDefined();
  });

  it("should export skills array with Frontend, AI, Infra, Backend categories", () => {
    const { skills } = require(resumeFile);
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThanOrEqual(4);

    const categories = skills.map((s: { category: string }) => s.category);
    expect(categories).toContain("Frontend");
    expect(categories).toContain("AI");
    expect(categories).toContain("Infra");
    expect(categories).toContain("Backend");

    skills.forEach((skill: { category: string; items: string[] }) => {
      expect(Array.isArray(skill.items)).toBe(true);
      expect(skill.category).toBeDefined();
    });
  });

  it("should export experience array in reverse chronological order", () => {
    const { experience } = require(resumeFile);
    expect(Array.isArray(experience)).toBe(true);
    expect(experience.length).toBeGreaterThanOrEqual(3);

    // Check first entry is SmartThings (most recent)
    expect(experience[0].company).toBe("SmartThings, Inc.");
    expect(experience[0].role).toBe("Senior Software Developer");
    expect(experience[0].period).toBe("January 2020 – Present");

    experience.forEach(
      (exp: {
        company: string;
        location: string;
        role: string;
        period: string;
        bullets: { label: string; body: string }[];
        stack: string[];
      }) => {
        expect(exp.company).toBeDefined();
        expect(exp.location).toBeDefined();
        expect(exp.role).toBeDefined();
        expect(exp.period).toBeDefined();
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(Array.isArray(exp.stack)).toBe(true);
      },
    );
  });

  it("should export education array with title and detail", () => {
    const { education } = require(resumeFile);
    expect(Array.isArray(education)).toBe(true);
    expect(education.length).toBeGreaterThanOrEqual(1);

    education.forEach((edu: { title: string; detail: string; status?: string }) => {
      expect(edu.title).toBeDefined();
      expect(edu.detail).toBeDefined();
    });

    // Check UCSC entry exists
    const ucsc = education.find(
      (e: { detail: string }) => e.detail.includes("UCSC") || e.detail.includes("Santa Cruz"),
    );
    expect(ucsc).toBeDefined();
  });
});
