import { education, experience, profile, skills } from "../../src/content/resume";

interface Skill {
  category: string;
  items: string[];
}

interface Bullet {
  label: string;
  body: string;
}

interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: Bullet[];
  stack: string[];
}

interface Education {
  title: string;
  detail: string;
  status?: string;
}

const typedSkills = skills as Skill[];
const typedExperience = experience as Experience[];
const typedEducation = education as Education[];

describe("resume data module", () => {
  describe("profile", () => {
    it("exports profile with correct name", () => {
      expect(profile.name).toBe("Paul-Valentin Mini");
    });

    it("exports profile with all required fields", () => {
      expect(profile).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          title: expect.any(String),
          tagline: expect.any(String),
          location: expect.any(String),
          email: expect.any(String),
          phone: expect.any(String),
          linkedin: expect.any(String),
          github: expect.any(String),
          summary: expect.any(String),
        }),
      );
    });

    it("has correct contact info from resume.md", () => {
      expect(profile.location).toBe("San Francisco, CA");
      expect(profile.email).toBe("paul@emini.com");
      expect(profile.phone).toBe("(415) 694-3616");
      expect(profile.linkedin).toBe("https://www.linkedin.com/in/pvmini");
      expect(profile.github).toBe("https://github.com/Laptopmini");
    });
  });

  describe("skills", () => {
    it("exports an array of skill categories", () => {
      expect(Array.isArray(typedSkills)).toBe(true);
      expect(typedSkills.length).toBeGreaterThanOrEqual(4);
    });

    it("each skill has category and items", () => {
      for (const skill of typedSkills) {
        expect(skill).toEqual(
          expect.objectContaining({
            category: expect.any(String),
            items: expect.arrayContaining([expect.any(String)]),
          }),
        );
      }
    });

    it("contains the four required categories", () => {
      const categories = typedSkills.map((s) => s.category);
      expect(categories).toEqual(
        expect.arrayContaining([
          expect.stringContaining("Frontend"),
          expect.stringContaining("AI"),
          expect.stringContaining("Infra"),
          expect.stringContaining("Backend"),
        ]),
      );
    });

    it("Frontend category includes expected items", () => {
      const frontend = typedSkills.find((s) => s.category.includes("Frontend"));
      expect(frontend).toBeDefined();
      expect(frontend?.items).toEqual(
        expect.arrayContaining(["JavaScript", "TypeScript", "React", "Next.js"]),
      );
    });
  });

  describe("experience", () => {
    it("exports an array of experiences", () => {
      expect(Array.isArray(typedExperience)).toBe(true);
      expect(typedExperience.length).toBeGreaterThanOrEqual(5);
    });

    it("each experience has required fields", () => {
      for (const exp of typedExperience) {
        expect(exp).toEqual(
          expect.objectContaining({
            company: expect.any(String),
            location: expect.any(String),
            role: expect.any(String),
            period: expect.any(String),
            bullets: expect.any(Array),
            stack: expect.any(Array),
          }),
        );
      }
    });

    it("bullets have label and body", () => {
      for (const exp of typedExperience) {
        for (const bullet of exp.bullets) {
          expect(bullet).toEqual(
            expect.objectContaining({
              label: expect.any(String),
              body: expect.any(String),
            }),
          );
        }
      }
    });

    it("is in reverse chronological order (most recent first)", () => {
      expect(typedExperience[0].company).toBe("SmartThings, Inc.");
    });

    it("first experience has correct details", () => {
      const first = typedExperience[0];
      expect(first.role).toBe("Senior Software Developer");
      expect(first.location).toBe("San Francisco, CA");
      expect(first.stack).toEqual(expect.arrayContaining(["React", "Next.js", "TypeScript"]));
    });
  });

  describe("education", () => {
    it("exports an array of education entries", () => {
      expect(Array.isArray(typedEducation)).toBe(true);
      expect(typedEducation.length).toBeGreaterThanOrEqual(2);
    });

    it("each entry has title and detail", () => {
      for (const edu of typedEducation) {
        expect(edu).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            detail: expect.any(String),
          }),
        );
      }
    });

    it("includes UCSC degree", () => {
      const ucsc = typedEducation.find(
        (e) => e.detail.includes("UCSC") || e.detail.includes("Santa Cruz"),
      );
      expect(ucsc).toBeDefined();
      expect(ucsc?.title).toContain("Computer Science");
    });

    it("entries with in-progress status have status field", () => {
      const inProgress = typedEducation.find((e) => e.status === "In Progress");
      expect(inProgress).toBeDefined();
    });
  });
});
