import { render, screen } from "@testing-library/react";
import Hero from "@/src/components/Hero";
import { resume } from "@/src/content/resume";

describe("Hero component", () => {
  beforeEach(() => {
    render(<Hero />);
  });

  it("renders the hero section with data-testid", () => {
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("renders the parallax background div", () => {
    expect(screen.getByTestId("hero-bg")).toBeInTheDocument();
  });

  it("renders the avatar image with correct attributes", () => {
    const avatar = screen.getByTestId("hero-avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar.tagName.toLowerCase()).toBe("img");
    expect(avatar).toHaveAttribute("width", "240");
    expect(avatar).toHaveAttribute("height", "240");
  });

  it("renders the name as h1", () => {
    const name = screen.getByTestId("hero-name");
    expect(name).toBeInTheDocument();
    expect(name.tagName.toLowerCase()).toBe("h1");
    expect(name).toHaveTextContent(resume.profile.name);
  });

  it("renders the title", () => {
    const title = screen.getByTestId("hero-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Senior Software Developer");
  });

  it("renders the tagline from resume data", () => {
    const tagline = screen.getByTestId("hero-tagline");
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveTextContent(resume.profile.tagline);
  });

  it("has full-viewport min height", () => {
    const hero = screen.getByTestId("hero");
    expect(hero.className).toMatch(/min-h-\[90vh\]/);
  });
});
