import { education, experience, profile, skills } from "@/src/content/resume";

describe("src/content/resume", () => {
  describe("profile", () => {
    test("has required fields with correct values", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toContain("pvmini");
      expect(profile.github).toContain("Laptopmini");
      expect(typeof profile.title).toBe("string");
      expect(typeof profile.tagline).toBe("string");
      expect(typeof profile.summary).toBe("string");
    });

    test("summary mentions Lead Frontend Engineer", () => {
      expect(profile.summary).toContain("Lead Frontend Engineer");
    });
  });

  describe("skills", () => {
    test("has four skill categories", () => {
      expect(skills).toHaveLength(4);
    });

    test("each skill has category and items array", () => {
      for (const skill of skills) {
        expect(typeof skill.category).toBe("string");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    test("includes Frontend category with React", () => {
      const frontend = skills.find((s) => s.category.toLowerCase().includes("frontend"));
      expect(frontend).toBeDefined();
      expect(frontend?.items.some((i) => i.includes("React"))).toBe(true);
    });
  });

  describe("experience", () => {
    test("has five experience entries", () => {
      expect(experience).toHaveLength(5);
    });

    test("first entry is SmartThings Senior Software Developer", () => {
      expect(experience[0].company).toContain("SmartThings");
      expect(experience[0].role).toContain("Senior Software Developer");
      expect(experience[0].location).toBe("San Francisco, CA");
    });

    test("each entry has required fields", () => {
      for (const exp of experience) {
        expect(typeof exp.company).toBe("string");
        expect(typeof exp.location).toBe("string");
        expect(typeof exp.role).toBe("string");
        expect(typeof exp.period).toBe("string");
        expect(Array.isArray(exp.bullets)).toBe(true);
        expect(exp.bullets.length).toBeGreaterThan(0);
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
  });

  describe("education", () => {
    test("has at least one education entry", () => {
      expect(education.length).toBeGreaterThanOrEqual(1);
    });

    test("includes UCSC degree", () => {
      const ucsc = education.find((e) => e.detail.includes("Santa Cruz"));
      expect(ucsc).toBeDefined();
      expect(ucsc?.title).toContain("Computer Science");
    });

    test("each entry has title and detail", () => {
      for (const edu of education) {
        expect(typeof edu.title).toBe("string");
        expect(typeof edu.detail).toBe("string");
      }
    });
  });
});
