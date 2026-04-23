import { education, experience, profile, skills } from "../../src/content/resume";

describe("src/content/resume", () => {
  describe("profile", () => {
    it("has required fields", () => {
      expect(profile).toHaveProperty("name");
      expect(profile).toHaveProperty("title");
      expect(profile).toHaveProperty("tagline");
      expect(profile).toHaveProperty("location");
      expect(profile).toHaveProperty("email");
      expect(profile).toHaveProperty("phone");
      expect(profile).toHaveProperty("linkedin");
      expect(profile).toHaveProperty("github");
      expect(profile).toHaveProperty("summary");
    });

    it("matches resume.md values", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
    });

    it("summary starts with Lead Frontend Engineer", () => {
      expect(profile.summary).toMatch(/^Lead Frontend Engineer/);
    });
  });

  describe("skills", () => {
    it("is an array with 4 categories", () => {
      expect(Array.isArray(skills)).toBe(true);
      expect(skills).toHaveLength(4);
    });

    it("each skill has category and items", () => {
      for (const skill of skills) {
        expect(skill).toHaveProperty("category");
        expect(skill).toHaveProperty("items");
        expect(typeof skill.category).toBe("string");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    it("includes the four required categories", () => {
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
    it("is an array with at least 5 entries", () => {
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThanOrEqual(5);
    });

    it("each entry has required fields", () => {
      for (const exp of experience) {
        expect(exp).toHaveProperty("company");
        expect(exp).toHaveProperty("location");
        expect(exp).toHaveProperty("role");
        expect(exp).toHaveProperty("period");
        expect(exp).toHaveProperty("bullets");
        expect(exp).toHaveProperty("stack");
        expect(typeof exp.company).toBe("string");
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

    it("first entry is SmartThings (reverse chronological)", () => {
      expect(experience[0].company).toMatch(/SmartThings/);
    });

    it("last entry is Imprivata", () => {
      expect(experience[experience.length - 1].company).toMatch(/Imprivata/);
    });
  });

  describe("education", () => {
    it("is an array with at least 3 entries", () => {
      expect(Array.isArray(education)).toBe(true);
      expect(education.length).toBeGreaterThanOrEqual(3);
    });

    it("each entry has title and detail", () => {
      for (const edu of education) {
        expect(edu).toHaveProperty("title");
        expect(edu).toHaveProperty("detail");
        expect(typeof edu.title).toBe("string");
        expect(typeof edu.detail).toBe("string");
      }
    });

    it("includes UCSC entry", () => {
      const ucsc = education.find(
        (e) => e.detail.includes("Santa Cruz") || e.title.includes("UCSC"),
      );
      expect(ucsc).toBeDefined();
    });

    it("status field is optional and used for in-progress items", () => {
      const inProgress = education.find((e) => e.status === "In Progress");
      expect(inProgress).toBeDefined();
    });
  });
});
