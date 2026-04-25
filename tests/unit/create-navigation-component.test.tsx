/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from "@testing-library/react";

describe("Navigation component", () => {
  let Nav: () => React.JSX.Element;

  beforeEach(async () => {
    const mod = await import("@/src/components/Nav");
    Nav = mod.default;
  });

  it("renders with data-testid=nav", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it("renders brand name", () => {
    render(<Nav />);
    const brand = screen.getByTestId("nav-brand");
    expect(brand).toBeInTheDocument();
    expect(brand.textContent).toContain("Paul-Valentin Mini");
  });

  it("renders anchor links for all sections", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("anchor links point to correct hash targets", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile").getAttribute("href")).toBe("#profile");
    expect(screen.getByTestId("nav-link-skills").getAttribute("href")).toBe("#skills");
    expect(screen.getByTestId("nav-link-experience").getAttribute("href")).toBe("#experience");
    expect(screen.getByTestId("nav-link-education").getAttribute("href")).toBe("#education");
  });

  it("renders a hamburger toggle button", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-toggle")).toBeInTheDocument();
  });

  it("toggles nav-menu visibility when hamburger is clicked", () => {
    render(<Nav />);
    const toggle = screen.getByTestId("nav-toggle");
    fireEvent.click(toggle);
    const menu = screen.getByTestId("nav-menu");
    expect(menu).toBeInTheDocument();
  });
});
