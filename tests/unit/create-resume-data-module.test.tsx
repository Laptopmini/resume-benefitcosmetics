import { education, experience, profile, skills } from "../../src/content/resume";

describe("resume data module", () => {
  describe("profile", () => {
    it("exports profile object with required fields", () => {
      expect(profile).toMatchObject({
        name: expect.any(String),
        title: expect.any(String),
        tagline: expect.any(String),
        location: expect.any(String),
        email: expect.any(String),
        phone: expect.any(String),
        linkedin: expect.any(String),
        github: expect.any(String),
        summary: expect.any(String),
      });
    });

    it("profile name matches resume", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
    });

    it("profile location matches resume", () => {
      expect(profile.location).toBe("San Francisco, CA");
    });

    it("profile email matches resume", () => {
      expect(profile.email).toBe("paul@emini.com");
    });
  });

  describe("skills", () => {
    it("exports skills array with Frontend, AI, Infra, Backend categories", () => {
      const categories = skills.map((s) => s.category);
      expect(categories).toContain("Frontend");
      expect(categories).toContain("AI");
      expect(categories).toContain("Infra");
      expect(categories).toContain("Backend");
    });

    it("each skill category has items array", () => {
      skills.forEach((category) => {
        expect(category).toMatchObject({
          category: expect.any(String),
          items: expect.any(Array),
        });
        expect(category.items.length).toBeGreaterThan(0);
      });
    });
  });

  describe("experience", () => {
    it("exports experience array in reverse chronological order", () => {
      expect(experience.length).toBeGreaterThan(0);
      const periods = experience.map((e) => e.period);
      // First entry should be "January 2020 – Present"
      expect(periods[0]).toContain("January 2020");
    });

    it("each experience entry has required fields", () => {
      experience.forEach((entry) => {
        expect(entry).toMatchObject({
          company: expect.any(String),
          location: expect.any(String),
          role: expect.any(String),
          period: expect.any(String),
          bullets: expect.any(Array),
          stack: expect.any(Array),
        });
        expect(entry.bullets.length).toBeGreaterThan(0);
        expect(entry.stack.length).toBeGreaterThan(0);
      });
    });

    it("first experience is SmartThings Senior Software Developer", () => {
      expect(experience[0].company).toBe("SmartThings, Inc.");
      expect(experience[0].role).toBe("Senior Software Developer");
    });
  });

  describe("education", () => {
    it("exports education array", () => {
      expect(education.length).toBeGreaterThan(0);
    });

    it("each education entry has title and detail", () => {
      education.forEach((entry) => {
        expect(entry).toMatchObject({
          title: expect.any(String),
          detail: expect.any(String),
        });
      });
    });

    it("first education entry is B.A. Computer Science from UCSC", () => {
      expect(education[0].title).toBe("B.A. Computer Science");
      expect(education[0].detail).toContain("UCSC");
    });
  });
});
