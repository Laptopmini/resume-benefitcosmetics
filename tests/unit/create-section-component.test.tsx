import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Section from "@/src/components/Section";

describe("src/components/Section", () => {
  test("renders section with correct id and data-testid", () => {
    const { getByTestId } = render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    const section = getByTestId("section-skills");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section).toHaveAttribute("id", "skills");
  });

  test("applies section-pad class", () => {
    const { getByTestId } = render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    expect(getByTestId("section-skills").className).toContain("section-pad");
  });

  test("renders title when provided", () => {
    const { getByTestId } = render(
      <Section id="skills" title="Skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    const heading = getByTestId("section-skills-title");
    expect(heading).toBeInTheDocument();
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading).toHaveTextContent("Skills");
  });

  test("does not render title when omitted", () => {
    const { queryByTestId } = render(
      <Section id="skills" testId="section-skills">
        <p>content</p>
      </Section>,
    );
    expect(queryByTestId("section-skills-title")).toBeNull();
  });

  test("renders children", () => {
    const { getByText } = render(
      <Section id="skills" testId="section-skills">
        <p>child element</p>
      </Section>,
    );
    expect(getByText("child element")).toBeInTheDocument();
  });
});
