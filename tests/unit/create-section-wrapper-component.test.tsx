/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

describe("Section wrapper component", () => {
  let Section: (props: {
    id: string;
    title?: string;
    testId: string;
    children: React.ReactNode;
  }) => React.JSX.Element;

  beforeEach(async () => {
    const mod = await import("@/src/components/Section");
    Section = mod.default;
  });

  it("renders a section element with the given id", () => {
    render(
      <Section id="test-section" testId="sec-test">
        <p>content</p>
      </Section>,
    );
    const section = screen.getByTestId("sec-test");
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.getAttribute("id")).toBe("test-section");
  });

  it("applies the section-pad class", () => {
    render(
      <Section id="padded" testId="sec-padded">
        <p>content</p>
      </Section>,
    );
    const section = screen.getByTestId("sec-padded");
    expect(section.className).toContain("section-pad");
  });

  it("renders children", () => {
    render(
      <Section id="children-test" testId="sec-children">
        <span data-testid="child-elem">hello</span>
      </Section>,
    );
    expect(screen.getByTestId("child-elem")).toBeInTheDocument();
  });

  it("renders an h2 with title when title is provided", () => {
    render(
      <Section id="titled" testId="sec-titled" title="My Title">
        <p>content</p>
      </Section>,
    );
    const heading = screen.getByTestId("sec-titled-title");
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading.textContent).toBe("My Title");
  });

  it("does not render h2 when title is omitted", () => {
    render(
      <Section id="no-title" testId="sec-no-title">
        <p>content</p>
      </Section>,
    );
    expect(screen.queryByTestId("sec-no-title-title")).toBeNull();
  });
});
