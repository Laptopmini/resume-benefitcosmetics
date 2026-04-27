import { education, experience, profile, skills } from "../../../src/content/resume";

describe("resume content data", () => {
  describe("profile", () => {
    it("has required fields", () => {
      expect(profile).toMatchObject({
        name: "Paul-Valentin Mini",
      });
    });

    it("has a title", () => {
      expect(typeof profile.title).toBe("string");
      expect(profile.title.length).toBeGreaterThan(0);
    });

    it("has contact information", () => {
      expect(typeof profile.email).toBe("string");
      expect(profile.email).toContain("@");
      expect(typeof profile.phone).toBe("string");
      expect(typeof profile.linkedin).toBe("string");
      expect(profile.linkedin).toContain("linkedin.com");
      expect(typeof profile.github).toBe("string");
      expect(profile.github).toContain("github.com");
    });
  });

  describe("skills", () => {
    it("has Frontend, AI, Infra, and Backend categories", () => {
      const categories = skills.map((s) => s.category);
      expect(categories).toContain("Frontend");
      expect(categories).toContain("AI");
      expect(categories).toContain("Infra");
      expect(categories).toContain("Backend");
    });

    it("each category has non-empty items", () => {
      for (const skill of skills) {
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });
  });

  describe("experience", () => {
    it("has at least one experience entry", () => {
      expect(experience.length).toBeGreaterThan(0);
    });

    it("each experience has required fields", () => {
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

    it("bullets have label and body", () => {
      for (const exp of experience) {
        for (const bullet of exp.bullets) {
          expect(typeof bullet.label).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });
  });

  describe("education", () => {
    it("has at least one education entry", () => {
      expect(education.length).toBeGreaterThan(0);
    });

    it("each education entry has title and detail", () => {
      for (const edu of education) {
        expect(typeof edu.title).toBe("string");
        expect(edu.title.length).toBeGreaterThan(0);
        expect(typeof edu.detail).toBe("string");
        expect(edu.detail.length).toBeGreaterThan(0);
      }
    });
  });
});
