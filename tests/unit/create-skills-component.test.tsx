import { render, screen } from "@testing-library/react";
import Skills from "@/src/components/Skills";
import { resume } from "@/src/content/resume";

describe("Skills component", () => {
  beforeEach(() => {
    render(<Skills />);
  });

  it("renders four skill category groups", () => {
    const slugs = ["frontend", "ai", "infra", "backend"];
    for (const slug of slugs) {
      expect(screen.getByTestId(`skills-group-${slug}`)).toBeInTheDocument();
    }
  });

  it("renders category labels for each group", () => {
    const slugs = ["frontend", "ai", "infra", "backend"];
    for (const slug of slugs) {
      const label = screen.getByTestId(`skills-group-${slug}-label`);
      expect(label).toBeInTheDocument();
      expect(label.tagName.toLowerCase()).toBe("h3");
    }
  });

  it("renders skill chips for the first category", () => {
    const firstCategory = resume.skills[0];
    for (let i = 0; i < firstCategory.items.length; i++) {
      const chip = screen.getByTestId(`skill-chip-frontend-${i}`);
      expect(chip).toBeInTheDocument();
      expect(chip.tagName.toLowerCase()).toBe("span");
      expect(chip).toHaveTextContent(firstCategory.items[i]);
    }
  });

  it("applies pill styling to chips", () => {
    const chip = screen.getByTestId("skill-chip-frontend-0");
    expect(chip.className).toMatch(/rounded-full/);
    expect(chip.className).toMatch(/px-4/);
  });
});
