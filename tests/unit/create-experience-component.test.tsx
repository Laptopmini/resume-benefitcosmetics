import { render, screen } from "@testing-library/react";
import Experience from "@/src/components/Experience";
import { resume } from "@/src/content/resume";

describe("Experience component", () => {
  beforeEach(() => {
    render(<Experience />);
  });

  it("renders the experience timeline as an ordered list", () => {
    const timeline = screen.getByTestId("experience-timeline");
    expect(timeline).toBeInTheDocument();
    expect(timeline.tagName.toLowerCase()).toBe("ol");
  });

  it("renders all experience items", () => {
    for (let i = 0; i < resume.experience.length; i++) {
      expect(screen.getByTestId(`experience-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders company, role, and period for the first item", () => {
    const company = screen.getByTestId("experience-company-0");
    const role = screen.getByTestId("experience-role-0");
    const period = screen.getByTestId("experience-period-0");

    expect(company).toHaveTextContent(resume.experience[0].company);
    expect(role).toHaveTextContent(resume.experience[0].role);
    expect(period).toHaveTextContent(resume.experience[0].period);
  });

  it("renders bullets with label and body", () => {
    const bullets = screen.getByTestId("experience-bullets-0");
    expect(bullets).toBeInTheDocument();
    expect(bullets.tagName.toLowerCase()).toBe("ul");

    const firstBullet = screen.getByTestId("experience-bullet-0-0");
    expect(firstBullet).toBeInTheDocument();
    expect(firstBullet).toHaveTextContent(resume.experience[0].bullets[0].label);
    expect(firstBullet).toHaveTextContent(resume.experience[0].bullets[0].body);
  });

  it("renders tech stack chips for the first item", () => {
    const stackContainer = screen.getByTestId("experience-stack-0");
    expect(stackContainer).toBeInTheDocument();

    for (let k = 0; k < resume.experience[0].stack.length; k++) {
      const chip = screen.getByTestId(`experience-stack-chip-0-${k}`);
      expect(chip).toBeInTheDocument();
      expect(chip.tagName.toLowerCase()).toBe("span");
      expect(chip).toHaveTextContent(resume.experience[0].stack[k]);
    }
  });

  it("renders bullets with strong label elements", () => {
    const bullet = screen.getByTestId("experience-bullet-0-0");
    const strong = bullet.querySelector("strong");
    expect(strong).not.toBeNull();
    expect(strong).toHaveTextContent(resume.experience[0].bullets[0].label);
  });
});
