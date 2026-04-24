import { describe, expect, it } from "@jest/globals";

describe("create-src-content-resume-tsx", () => {
  it("exports resume data from src/content/resume.ts", async () => {
    const resume = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    expect(resume).toBeDefined();
  });

  it("profile object has required fields matching resume.md", async () => {
    const { profile } = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    expect(profile.name).toBe("Paul-Valentin Mini");
    expect(profile.title).toBeDefined();
    expect(profile.email).toBe("paul@emini.com");
    expect(profile.phone).toBe("(415) 694-3616");
  });

  it("skills array has Frontend, AI, Infra, and Backend categories", async () => {
    const { skills } = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    const categories = skills.map((s: { category: string }) => s.category);
    expect(categories).toContain("Frontend");
    expect(categories).toContain("AI");
    expect(categories).toContain("Infra");
    expect(categories).toContain("Backend");
  });

  it("experience array is in reverse chronological order", async () => {
    const { experience } = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    expect(experience.length).toBeGreaterThan(0);
    // SmartThings should be first (most recent)
    expect(experience[0].company).toBe("SmartThings, Inc.");
  });

  it("experience entries have company, location, role, period, bullets, and stack", async () => {
    const { experience } = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    const entry = experience[0];
    expect(entry.company).toBeDefined();
    expect(entry.location).toBeDefined();
    expect(entry.role).toBeDefined();
    expect(entry.period).toBeDefined();
    expect(entry.bullets).toBeInstanceOf(Array);
    expect(entry.stack).toBeInstanceOf(Array);
  });

  it("education array has UCSC degree and certifications", async () => {
    const { education } = await import("../../src/content/resume").catch(() => {
      throw new Error("src/content/resume.ts does not exist or has no exports");
    });
    expect(education.length).toBeGreaterThan(0);
    const ucsc = education.find((e: { title: string }) => e.title.includes("Computer Science"));
    expect(ucsc).toBeDefined();
  });
});
