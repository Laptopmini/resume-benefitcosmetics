/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

describe("Home page component", () => {
  let HomePage: () => React.JSX.Element;

  beforeEach(async () => {
    jest.resetModules();
    const mod = await import("@/app/page");
    HomePage = mod.default;
  });

  it("renders a main element with data-testid=home", () => {
    render(<HomePage />);
    const main = screen.getByTestId("home");
    expect(main.tagName.toLowerCase()).toBe("main");
  });

  it("renders section-hero", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-hero")).toBeInTheDocument();
  });

  it("renders section-profile", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-profile")).toBeInTheDocument();
  });

  it("renders section-skills", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-skills")).toBeInTheDocument();
  });

  it("renders section-experience", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-experience")).toBeInTheDocument();
  });

  it("renders section-education", () => {
    render(<HomePage />);
    expect(screen.getByTestId("section-education")).toBeInTheDocument();
  });

  it("all sections are siblings under main", () => {
    render(<HomePage />);
    const main = screen.getByTestId("home");
    const sections = main.querySelectorAll(":scope > section");
    expect(sections.length).toBeGreaterThanOrEqual(5);
  });
});
