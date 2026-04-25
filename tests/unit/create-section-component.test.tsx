/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Section from "@/src/components/Section";

describe("Section component", () => {
  it("renders a section element with correct id and testId", () => {
    render(
      <Section id="test-section" testId="section-test">
        <p>Content</p>
      </Section>,
    );
    const section = screen.getByTestId("section-test");
    expect(section).toBeDefined();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.getAttribute("id")).toBe("test-section");
  });

  it("applies section-pad class", () => {
    render(
      <Section id="padded" testId="section-padded">
        <p>Padded content</p>
      </Section>,
    );
    const section = screen.getByTestId("section-padded");
    expect(section.className).toContain("section-pad");
  });

  it("renders children", () => {
    render(
      <Section id="children" testId="section-children">
        <span data-testid="child-el">Hello</span>
      </Section>,
    );
    expect(screen.getByTestId("child-el")).toBeDefined();
  });

  it("renders title when provided", () => {
    render(
      <Section id="titled" testId="section-titled" title="My Title">
        <p>Content</p>
      </Section>,
    );
    const heading = screen.getByTestId("section-titled-title");
    expect(heading).toBeDefined();
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading.textContent).toBe("My Title");
  });

  it("does not render title when not provided", () => {
    render(
      <Section id="no-title" testId="section-no-title">
        <p>Content</p>
      </Section>,
    );
    const heading = screen.queryByTestId("section-no-title-title");
    expect(heading).toBeNull();
  });
});
