import { COPY, EDUCATION, EXPERIENCE, PROFILE, SKILL_GROUPS } from "@/content/resume";

describe("resume content module", () => {
  describe("COPY", () => {
    it("has all required keys with exact values", () => {
      expect(COPY.heroEyebrow).toBe("Now Showing");
      expect(COPY.heroTagline).toBe("Lead Frontend Engineer — Garnishes UIs With Wit Since 2015");
      expect(COPY.profileLabel).toBe("About the Engineer");
      expect(COPY.profileHeading).toBe("The Profile");
      expect(COPY.skillsLabel).toBe("The Marquee of Skills");
      expect(COPY.experienceLabel).toBe("Featured Engagements");
      expect(COPY.experienceHeading).toBe("The Marquee");
      expect(COPY.educationLabel).toBe("Diplomas & Distinctions");
      expect(COPY.footerLine).toBe("Hand-set in San Francisco. Not tested on focus groups.");
    });
  });

  describe("PROFILE", () => {
    it("has correct contact info", () => {
      expect(PROFILE.name).toBe("Paul-Valentin Mini");
      expect(PROFILE.location).toBe("San Francisco, CA");
      expect(PROFILE.phone).toBe("(415) 694-3616");
      expect(PROFILE.email).toBe("paul@emini.com");
      expect(PROFILE.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(PROFILE.github).toBe("https://github.com/Laptopmini");
    });

    it("has summary from resume.md", () => {
      expect(PROFILE.summary).toContain("Lead Frontend Engineer");
      expect(PROFILE.summary).toContain("Samsung SmartThings");
      expect(PROFILE.summary).toContain("Applied AI");
    });
  });

  describe("SKILL_GROUPS", () => {
    it("has 4 skill groups", () => {
      expect(SKILL_GROUPS).toHaveLength(4);
    });

    it("each group has label and items array", () => {
      for (const group of SKILL_GROUPS) {
        expect(group).toHaveProperty("label");
        expect(group).toHaveProperty("items");
        expect(Array.isArray(group.items)).toBe(true);
        expect(group.items.length).toBeGreaterThan(0);
      }
    });

    it("first group is Frontend & Web", () => {
      expect(SKILL_GROUPS[0].label).toBe("Frontend & Web");
    });
  });

  describe("EXPERIENCE", () => {
    it("has 5 entries", () => {
      expect(EXPERIENCE).toHaveLength(5);
    });

    it("entries are in correct order", () => {
      expect(EXPERIENCE[0].company).toBe("SmartThings, Inc.");
      expect(EXPERIENCE[1].company).toBe("Samsung Research America");
      expect(EXPERIENCE[2].company).toBe("Samsung Strategy & Innovation Center");
      expect(EXPERIENCE[3].company).toBe("Prism, Inc.");
      expect(EXPERIENCE[4].company).toBe("Imprivata");
    });

    it("each entry has required shape", () => {
      for (const entry of EXPERIENCE) {
        expect(entry).toHaveProperty("company");
        expect(entry).toHaveProperty("location");
        expect(entry).toHaveProperty("role");
        expect(entry).toHaveProperty("period");
        expect(Array.isArray(entry.bullets)).toBe(true);
        expect(entry.bullets.length).toBeGreaterThan(0);
        expect(Array.isArray(entry.stack)).toBe(true);
        expect(entry.stack.length).toBeGreaterThan(0);
      }
    });

    it("bullets have heading and body", () => {
      for (const entry of EXPERIENCE) {
        for (const bullet of entry.bullets) {
          expect(bullet).toHaveProperty("heading");
          expect(bullet).toHaveProperty("body");
          expect(typeof bullet.heading).toBe("string");
          expect(typeof bullet.body).toBe("string");
        }
      }
    });

    it("SmartThings has correct details", () => {
      const st = EXPERIENCE[0];
      expect(st.location).toBe("San Francisco, CA");
      expect(st.role).toBe("Senior Software Developer");
      expect(st.period).toBe("January 2020 – Present");
      expect(st.bullets).toHaveLength(4);
    });
  });

  describe("EDUCATION", () => {
    it("has 3 entries", () => {
      expect(EDUCATION).toHaveLength(3);
    });

    it("each entry has a line string", () => {
      for (const entry of EDUCATION) {
        expect(typeof entry.line).toBe("string");
        expect(entry.line.length).toBeGreaterThan(0);
      }
    });

    it("first entry is UCSC degree", () => {
      expect(EDUCATION[0].line).toContain("B.A. Computer Science");
      expect(EDUCATION[0].line).toContain("UCSC");
    });
  });
});
