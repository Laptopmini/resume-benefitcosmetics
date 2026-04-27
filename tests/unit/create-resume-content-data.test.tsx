import { education, experience, profile, skills } from "@/src/content/resume";

describe("src/content/resume", () => {
  describe("profile", () => {
    test("has required fields with correct values", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
      expect(typeof profile.title).toBe("string");
      expect(typeof profile.tagline).toBe("string");
      expect(typeof profile.summary).toBe("string");
      expect(profile.summary.length).toBeGreaterThan(0);
    });
  });

  describe("skills", () => {
    test("has four skill categories", () => {
      expect(skills).toHaveLength(4);
    });

    test("each category has a name and non-empty items array", () => {
      for (const skill of skills) {
        expect(typeof skill.category).toBe("string");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    test("includes Frontend, AI, Infra, and Backend categories", () => {
      const categories = skills.map((s) => s.category.toLowerCase());
      expect(categories.some((c) => c.includes("frontend"))).toBe(true);
      expect(categories.some((c) => c.includes("ai"))).toBe(true);
      expect(categories.some((c) => c.includes("infra") || c.includes("devops"))).toBe(true);
      expect(categories.some((c) => c.includes("backend"))).toBe(true);
    });
  });

  describe("experience", () => {
    test("has at least 5 entries", () => {
      expect(experience.length).toBeGreaterThanOrEqual(5);
    });

    test("each entry has required fields", () => {
      for (const exp of experience) {
        expect(typeof exp.company).toBe("string");
        expect(typeof exp.location).toBe("string");
        expect(typeof exp.role).toBe("string");
        expect(typeof exp.period).toBe("string");
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(Array.isArray(exp.stack)).toBe(true);
      }
    });

    test("bullets have label and body", () => {
      for (const exp of experience) {
        for (const bullet of exp.bullets) {
          expect(typeof bullet.label).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });

    test("first entry is SmartThings Senior role (reverse chronological)", () => {
      expect(experience[0].company).toMatch(/SmartThings/i);
      expect(experience[0].role).toMatch(/Senior/i);
    });
  });

  describe("education", () => {
    test("has at least one entry", () => {
      expect(education.length).toBeGreaterThanOrEqual(1);
    });

    test("entries have title and detail", () => {
      for (const edu of education) {
        expect(typeof edu.title).toBe("string");
        expect(typeof edu.detail).toBe("string");
      }
    });

    test("includes UCSC degree", () => {
      const hasUcsc = education.some(
        (e) => e.title.includes("Computer Science") || e.detail.includes("UCSC"),
      );
      expect(hasUcsc).toBe(true);
    });
  });
});
