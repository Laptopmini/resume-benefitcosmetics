import { render, screen } from "@testing-library/react";
import Section from "@/src/components/Section";

describe("src/components/Section.tsx", () => {
  test("renders section with id and data-testid", () => {
    render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    const section = screen.getByTestId("section-skills");
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.getAttribute("id")).toBe("skills");
  });

  test("applies section-pad class", () => {
    render(
      <Section id="test" testId="section-test">
        <p>content</p>
      </Section>,
    );
    const section = screen.getByTestId("section-test");
    expect(section.className).toMatch(/section-pad/);
  });

  test("renders title as h2 when provided", () => {
    render(
      <Section id="skills" title="Skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    const heading = screen.getByTestId("section-skills-title");
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading.textContent).toBe("Skills");
  });

  test("does not render h2 when title is omitted", () => {
    render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    expect(screen.queryByTestId("section-skills-title")).toBeNull();
  });

  test("renders children", () => {
    render(
      <Section id="skills" testId="section-skills">
        <p>child-content</p>
      </Section>,
    );
    expect(screen.getByText("child-content")).toBeTruthy();
  });
});
