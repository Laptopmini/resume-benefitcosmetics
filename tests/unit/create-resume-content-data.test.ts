import { education, experience, profile, skills } from "@/content/resume";

describe("resume content", () => {
  describe("profile", () => {
    it("has name Paul-Valentin Mini", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
    });

    it("has correct contact fields", () => {
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
    });

    it("has location San Francisco, CA", () => {
      expect(profile.location).toBe("San Francisco, CA");
    });
  });

  describe("skills", () => {
    it("has four categories", () => {
      expect(skills).toHaveLength(4);
    });

    it("has Frontend & Web category", () => {
      const fe = skills.find((s) => s.category === "Frontend & Web");
      expect(fe).toBeDefined();
      expect(fe?.items).toContain("JavaScript");
      expect(fe?.items).toContain("TypeScript");
      expect(fe?.items).toContain("React");
      expect(fe?.items).toContain("Next.js");
    });

    it("has AI & Machine Learning category", () => {
      const ai = skills.find((s) => s.category === "AI & Machine Learning");
      expect(ai).toBeDefined();
    });

    it("has Infrastructure & DevOps category", () => {
      const infra = skills.find((s) => s.category === "Infrastructure & DevOps");
      expect(infra).toBeDefined();
    });

    it("has Backend & Mobile category", () => {
      const backend = skills.find((s) => s.category === "Backend & Mobile");
      expect(backend).toBeDefined();
    });
  });

  describe("experience", () => {
    it("has experience entries", () => {
      expect(experience.length).toBeGreaterThan(0);
    });

    it("first entry is SmartThings", () => {
      expect(experience[0].company).toBe("SmartThings, Inc.");
      expect(experience[0].role).toBe("Senior Software Developer");
    });

    it("experience entries have stack arrays", () => {
      for (const exp of experience) {
        expect(Array.isArray(exp.stack)).toBe(true);
      }
    });

    it("experience entries have bullets arrays", () => {
      for (const exp of experience) {
        expect(Array.isArray(exp.bullets)).toBe(true);
        for (const bullet of exp.bullets) {
          expect(typeof bullet.label).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });
  });

  describe("education", () => {
    it("has education entries", () => {
      expect(education.length).toBeGreaterThan(0);
    });

    it("first entry is B.A. Computer Science from UCSC", () => {
      expect(education[0].title).toBe("B.A. Computer Science");
      expect(education[0].detail).toBe("University of California, Santa Cruz (UCSC)");
    });
  });
});
