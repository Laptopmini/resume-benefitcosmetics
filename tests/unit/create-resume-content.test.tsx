import { join } from "node:path";

const CONTENT_PATH = join(__dirname, "..", "..", "src", "content", "resume.ts");

describe("resume content", () => {
  let profile: {
    name: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  let skills: { category: string; items: string[] }[];
  let experience: {
    company: string;
    location: string;
    role: string;
    period: string;
    bullets: { label: string; body: string }[];
    stack: string[];
  }[];
  let education: { title: string; detail: string; status?: string }[];

  beforeEach(async () => {
    const mod = await import(CONTENT_PATH);
    profile = mod.profile;
    skills = mod.skills;
    experience = mod.experience;
    education = mod.education;
  });

  describe("profile", () => {
    it("has correct name and location", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
      expect(profile.location).toBe("San Francisco, CA");
    });

    it("has correct contact info", () => {
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
    });

    it("has summary text", () => {
      expect(profile.summary).toBeTruthy();
      expect(profile.summary.length).toBeGreaterThan(50);
    });
  });

  describe("skills", () => {
    it("has 4 categories", () => {
      expect(skills).toHaveLength(4);
    });

    it("includes expected categories", () => {
      const categories = skills.map((s) => s.category);
      expect(categories).toContain("Frontend & Web");
      expect(categories).toContain("AI & Machine Learning");
      expect(categories).toContain("Infrastructure & DevOps");
      expect(categories).toContain("Backend & Mobile");
    });

    it("each category has items", () => {
      for (const skill of skills) {
        expect(skill.items.length).toBeGreaterThan(0);
      }
    });
  });

  describe("experience", () => {
    it("has 5 entries in reverse chronological order", () => {
      expect(experience).toHaveLength(5);
      expect(experience[0].company).toContain("SmartThings");
    });

    it("each entry has required fields", () => {
      for (const exp of experience) {
        expect(exp.company).toBeTruthy();
        expect(exp.location).toBeTruthy();
        expect(exp.role).toBeTruthy();
        expect(exp.period).toBeTruthy();
        expect(exp.bullets.length).toBeGreaterThan(0);
        expect(exp.stack.length).toBeGreaterThan(0);
      }
    });

    it("bullets have label and body", () => {
      for (const exp of experience) {
        for (const bullet of exp.bullets) {
          expect(bullet.label).toBeTruthy();
          expect(bullet.body).toBeTruthy();
        }
      }
    });
  });

  describe("education", () => {
    it("has 3 entries", () => {
      expect(education).toHaveLength(3);
    });

    it("first entry is UCSC degree", () => {
      expect(education[0].title).toContain("Computer Science");
      expect(education[0].detail).toContain("Santa Cruz");
    });
  });
});
