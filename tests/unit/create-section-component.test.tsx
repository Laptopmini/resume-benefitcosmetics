import { render, screen } from "@testing-library/react";
import "./setup";
import Section from "@/components/Section";

describe("Section component", () => {
  it("renders section with testId", () => {
    render(<Section id="test-section" testId="section-test" />);
    expect(screen.getByTestId("section-test")).toBeInTheDocument();
  });

  it("renders section with correct id attribute", () => {
    render(<Section id="my-id" testId="section-myid" />);
    const el = screen.getByTestId("section-myid");
    expect(el).toHaveAttribute("id", "my-id");
  });

  it("renders title when provided", () => {
    render(<Section id="test" testId="section-title" title="My Title" />);
    expect(screen.getByTestId("section-title-title")).toHaveTextContent("My Title");
  });

  it("renders children when provided", () => {
    render(
      <Section id="test" testId="section-children">
        <span data-testid="child">Hello</span>
      </Section>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello");
  });
});
