import { render, screen } from "@testing-library/react";
import { Section } from "@/components/Section";

describe("Section component", () => {
  const mockChildren = () => <div data-testid="section-content">Test Content</div>;

  it("renders section with correct id and data-testid", () => {
    render(
      <Section id="profile" testId="section-profile">
        {mockChildren()}
      </Section>,
    );
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile").id).toBe("profile");
  });

  it("renders section with .section-pad class", () => {
    render(
      <Section id="test" testId="section-test">
        {mockChildren()}
      </Section>,
    );
    const section = screen.getByTestId("section-test");
    expect(section.className).toContain("section-pad");
  });

  it("renders h2 title with Apple-style typography when title is provided", () => {
    render(
      <Section id="profile" title="Profile" testId="section-profile">
        {mockChildren()}
      </Section>,
    );
    expect(screen.getByTestId("section-profile-title")).toBeInTheDocument();
    expect(screen.getByTestId("section-profile-title").tagName).toBe("H2");
    expect(screen.getByTestId("section-profile-title").className).toContain("text-4xl");
    expect(screen.getByTestId("section-profile-title").className).toContain("md:text-6xl");
    expect(screen.getByTestId("section-profile-title").className).toContain("font-semibold");
    expect(screen.getByTestId("section-profile-title").className).toContain("tracking-tight");
    expect(screen.getByTestId("section-profile-title").className).toContain("mb-12");
  });

  it("does not render h2 title when title is not provided", () => {
    render(
      <Section id="profile" testId="section-profile">
        {mockChildren()}
      </Section>,
    );
    expect(screen.queryByTestId("section-profile-title")).not.toBeInTheDocument();
  });

  it("renders children within the section", () => {
    render(
      <Section id="profile" testId="section-profile">
        {mockChildren()}
      </Section>,
    );
    expect(screen.getByTestId("section-content")).toBeInTheDocument();
  });
});
