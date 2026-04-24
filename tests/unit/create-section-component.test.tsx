import { render, screen } from "@testing-library/react";

const Section = require("../../src/components/Section").default;

describe("Section component", () => {
  it("renders section with correct id and data-testid", () => {
    render(
      <Section id="profile" testId="section-profile">
        {null}
      </Section>,
    );
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile")).toHaveAttribute("id", "profile");
  });

  it("renders section without title when not provided", () => {
    render(
      <Section id="skills" testId="section-skills">
        {null}
      </Section>,
    );
    const section = screen.getByTestId("section-skills");
    expect(section).toBeInTheDocument();
    expect(screen.queryByTestId("section-skills-title")).toBeNull();
  });

  it("renders h2 title with data-testid when title is provided", () => {
    render(
      <Section id="experience" testId="section-experience" title="Experience">
        {null}
      </Section>,
    );
    expect(screen.getByTestId("section-experience-title")).toBeInTheDocument();
    expect(screen.getByTestId("section-experience-title")).toHaveTextContent("Experience");
  });

  it("renders children content", () => {
    render(
      <Section id="education" testId="section-education">
        <span data-testid="education-content">Education Content</span>
      </Section>,
    );
    expect(screen.getByTestId("education-content")).toBeInTheDocument();
  });

  it("applies section-pad class", () => {
    const { container } = render(
      <Section id="hero" testId="section-hero">
        {null}
      </Section>,
    );
    expect(container.firstChild).toHaveClass("section-pad");
  });
});
