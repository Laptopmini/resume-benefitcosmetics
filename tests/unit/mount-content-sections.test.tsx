import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("app/page.tsx with content sections", () => {
  beforeEach(() => {
    render(<Page />);
  });

  it("renders Hero inside section-hero", () => {
    const section = screen.getByTestId("section-hero");
    expect(section).toBeInTheDocument();
    const hero = screen.getByTestId("hero");
    expect(section.contains(hero)).toBe(true);
  });

  it("renders Profile inside section-profile with title", () => {
    const section = screen.getByTestId("section-profile");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("section-profile-title")).toHaveTextContent("Profile");
    const summary = screen.getByTestId("profile-summary");
    expect(section.contains(summary)).toBe(true);
  });

  it("renders Skills inside section-skills with title", () => {
    const section = screen.getByTestId("section-skills");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("section-skills-title")).toHaveTextContent("Skills");
    const group = screen.getByTestId("skills-group-frontend");
    expect(section.contains(group)).toBe(true);
  });

  it("renders Experience inside section-experience with title", () => {
    const section = screen.getByTestId("section-experience");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("section-experience-title")).toHaveTextContent("Experience");
    const timeline = screen.getByTestId("experience-timeline");
    expect(section.contains(timeline)).toBe(true);
  });

  it("renders Education inside section-education with title", () => {
    const section = screen.getByTestId("section-education");
    expect(section).toBeInTheDocument();
    expect(screen.getByTestId("section-education-title")).toHaveTextContent("Education");
    const list = screen.getByTestId("education-list");
    expect(section.contains(list)).toBe(true);
  });

  it("section-hero has no title", () => {
    expect(screen.queryByTestId("section-hero-title")).not.toBeInTheDocument();
  });
});
