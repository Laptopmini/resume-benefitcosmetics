import { render, screen } from "@testing-library/react";
import Section from "../../../src/components/Section";

describe("Section component", () => {
  it("renders section with correct id and data-testid", () => {
    render(<Section id="test-section" testId="section-test" />);
    const section = screen.getByTestId("section-test");
    expect(section).toBeInTheDocument();
    expect(section.id).toBe("test-section");
  });

  it("renders section without title when not provided", () => {
    render(<Section id="test-section" testId="section-test" />);
    const section = screen.getByTestId("section-test");
    expect(section).toBeInTheDocument();
    expect(section.querySelector("h2")).toBeNull();
  });

  it("renders h2 title when title is provided", () => {
    render(<Section id="test-section" testId="section-test" title="Test Title" />);
    const titleEl = screen.getByTestId("section-test-title");
    expect(titleEl).toBeInTheDocument();
    expect(titleEl.tagName).toBe("H2");
  });

  it("renders children content", () => {
    render(
      <Section id="test-section" testId="section-test">
        <span data-testid="child-span">Child Content</span>
      </Section>,
    );
    expect(screen.getByTestId("child-span")).toBeInTheDocument();
  });

  it("applies section-pad class", () => {
    render(<Section id="test-section" testId="section-test" />);
    const section = screen.getByTestId("section-test");
    expect(section.className).toContain("section-pad");
  });
});
