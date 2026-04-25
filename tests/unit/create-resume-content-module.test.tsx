describe("resume content module", () => {
  let mod: typeof import("@/src/content/resume");

  beforeEach(async () => {
    mod = await import("@/src/content/resume");
  });

  describe("profile", () => {
    it("exports a profile object with required fields", () => {
      const { profile } = mod;
      expect(profile).toBeDefined();
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
  });

  describe("skills", () => {
    it("exports an array of skill categories", () => {
      const { skills } = mod;
      expect(Array.isArray(skills)).toBe(true);
      expect(skills.length).toBeGreaterThanOrEqual(4);
    });

    it("each skill has category and items", () => {
      const { skills } = mod;
      for (const skill of skills) {
        expect(typeof skill.category).toBe("string");
        expect(Array.isArray(skill.items)).toBe(true);
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });

    it("includes the four required categories", () => {
      const { skills } = mod;
      const categories = skills.map((s) => s.category);
      expect(categories).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/frontend/i),
          expect.stringMatching(/ai/i),
          expect.stringMatching(/infra/i),
          expect.stringMatching(/backend/i),
        ]),
      );
    });
  });

  describe("experience", () => {
    it("exports an array of experience entries in reverse chronological order", () => {
      const { experience } = mod;
      expect(Array.isArray(experience)).toBe(true);
      expect(experience.length).toBeGreaterThanOrEqual(5);
      expect(experience[0].company).toContain("SmartThings");
    });

    it("each experience has required fields", () => {
      const { experience } = mod;
      for (const entry of experience) {
        expect(typeof entry.company).toBe("string");
        expect(typeof entry.location).toBe("string");
        expect(typeof entry.role).toBe("string");
        expect(typeof entry.period).toBe("string");
        expect(Array.isArray(entry.bullets)).toBe(true);
        expect(Array.isArray(entry.stack)).toBe(true);
      }
    });

    it("bullets have label and body", () => {
      const { experience } = mod;
      for (const entry of experience) {
        for (const bullet of entry.bullets) {
          expect(typeof bullet.label).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });
  });

  describe("education", () => {
    it("exports an array of education entries", () => {
      const { education } = mod;
      expect(Array.isArray(education)).toBe(true);
      expect(education.length).toBeGreaterThanOrEqual(2);
    });

    it("each education entry has title and detail", () => {
      const { education } = mod;
      for (const entry of education) {
        expect(typeof entry.title).toBe("string");
        expect(typeof entry.detail).toBe("string");
      }
    });

    it("includes UCSC degree", () => {
      const { education } = mod;
      const ucsc = education.find(
        (e) => e.title.includes("Computer Science") || e.detail.includes("UCSC"),
      );
      expect(ucsc).toBeDefined();
    });
  });
});
