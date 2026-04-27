import * as resume from "@/content/resume";

describe("resume content data", () => {
  it("exports profile with correct structure and values", () => {
    expect(resume.profile).toBeDefined();
    expect(typeof resume.profile).toBe("object");

    expect(resume.profile.name).toBe("Paul-Valentin Mini");
    expect(resume.profile.title).toBe("Senior Software Developer");
    expect(resume.profile.location).toBe("San Francisco, CA");
    expect(resume.profile.email).toBe("paul@emini.com");
    expect(resume.profile.phone).toBe("(415) 694-3616");
    expect(resume.profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
    expect(resume.profile.github).toBe("https://github.com/Laptopmini");
    expect(typeof resume.profile.summary).toBe("string");
    expect(resume.profile.summary.length).toBeGreaterThan(0);
  });

  it("exports skills with Frontend, AI, Infra, and Backend categories", () => {
    expect(resume.skills).toBeDefined();
    expect(Array.isArray(resume.skills)).toBe(true);
    expect(resume.skills.length).toBe(4);

    const categories = resume.skills.map((s) => s.category);
    expect(categories).toContain("Frontend & Web");
    expect(categories).toContain("AI & Machine Learning");
    expect(categories).toContain("Infrastructure & DevOps");
    expect(categories).toContain("Backend & Mobile");

    resume.skills.forEach((skillCategory) => {
      expect(typeof skillCategory.category).toBe("string");
      expect(Array.isArray(skillCategory.items)).toBe(true);
      expect(skillCategory.items.length).toBeGreaterThan(0);
    });
  });

  it("exports experience in reverse chronological order", () => {
    expect(resume.experience).toBeDefined();
    expect(Array.isArray(resume.experience)).toBe(true);
    expect(resume.experience.length).toBeGreaterThan(0);

    // Most recent first
    expect(resume.experience[0].company).toBe("SmartThings, Inc.");
    expect(resume.experience[0].role).toBe("Senior Software Developer");
    expect(resume.experience[0].period).toBe("January 2020 – Present");

    resume.experience.forEach((exp) => {
      expect(typeof exp.company).toBe("string");
      expect(typeof exp.location).toBe("string");
      expect(typeof exp.role).toBe("string");
      expect(typeof exp.period).toBe("string");
      expect(Array.isArray(exp.bullets)).toBe(true);
      expect(Array.isArray(exp.stack)).toBe(true);
    });
  });

  it("exports education with required fields", () => {
    expect(resume.education).toBeDefined();
    expect(Array.isArray(resume.education)).toBe(true);
    expect(resume.education.length).toBeGreaterThan(0);

    const csDegree = resume.education.find((e) => e.title.includes("Computer Science"));
    expect(csDegree).toBeDefined();
    expect(csDegree?.title).toContain("B.A. Computer Science");
    expect(csDegree?.detail).toContain("University of California, Santa Cruz");
  });
});
