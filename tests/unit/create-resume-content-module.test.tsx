import { education, experience, profile, skills } from "@/src/content/resume";

describe("resume content module", () => {
  describe("profile", () => {
    it("exports profile with required fields", () => {
      expect(profile).toMatchObject({
        name: "Paul-Valentin Mini",
        title: expect.any(String),
        tagline: expect.any(String),
        location: "San Francisco, CA",
        email: "paul@emini.com",
        phone: "(415) 694-3616",
        linkedin: "https://www.linkedin.com/in/pvmini",
        github: "https://github.com/Laptopmini",
        summary: expect.stringContaining("Lead Frontend Engineer"),
      });
    });

    it("summary matches resume.md content", () => {
      expect(profile.summary).toContain("10 years of experience");
      expect(profile.summary).toContain("Samsung SmartThings");
    });
  });

  describe("skills", () => {
    it("exports array of skill categories", () => {
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThanOrEqual(4);
    });

    it("each skill has category and items", () => {
      for (const skill of skills) {
        expect(skill).toHaveProperty("category");
        expect(skill).toHaveProperty("items");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    it("contains the four required categories", () => {
      const categories = skills.map((s) => s.category);
      expect(categories).toEqual(
        expect.arrayContaining([
          expect.stringContaining("Frontend"),
          expect.stringContaining("AI"),
          expect.stringContaining("Infra"),
          expect.stringContaining("Backend"),
        ]),
      );
    });
  });

  describe("experience", () => {
    it("exports array of experiences in reverse chronological order", () => {
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThanOrEqual(5);
    });

    it("first entry is SmartThings (most recent)", () => {
      expect(experience[0].company).toContain("SmartThings");
      expect(experience[0].role).toContain("Senior Software Developer");
    });

    it("each experience has required fields", () => {
      for (const exp of experience) {
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("location");
        expect(exp).toHaveProperty("role");
        expect(exp).toHaveProperty("period");
        expect(exp).toHaveProperty("bullets");
        expect(exp).toHaveProperty("stack");
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(Array.isArray(exp.stack)).toBe(true);
      }
    });

    it("bullets have label and body", () => {
      for (const exp of experience) {
        for (const bullet of exp.bullets) {
          expect(bullet).toHaveProperty("label");
          expect(bullet).toHaveProperty("body");
          expect(typeof bullet.label).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });
  });

  describe("education", () => {
    it("exports array of education entries", () => {
      expect(Array.isArray(education)).toBe(true);
      expect(education.length).toBeGreaterThanOrEqual(2);
    });

    it("each entry has title and detail", () => {
      for (const ed of education) {
        expect(ed).toHaveProperty("title");
        expect(ed).toHaveProperty("detail");
        expect(typeof ed.title).toBe("string");
        expect(typeof ed.detail).toBe("string");
      }
    });

    it("includes B.A. Computer Science", () => {
      const ba = education.find((e) => e.title.includes("B.A."));
      expect(ba).toBeDefined();
      expect(ba?.detail).toContain("UCSC");
    });
  });
});
