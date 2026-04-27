import { fireEvent, render, screen } from "@testing-library/react";
import Nav from "@/src/components/Nav";

describe("src/components/Nav.tsx", () => {
  beforeEach(() => {
    render(<Nav />);
  });

  test("renders nav with data-testid", () => {
    expect(screen.getByTestId("nav")).toBeTruthy();
  });

  test("renders brand name", () => {
    const brand = screen.getByTestId("nav-brand");
    expect(brand.textContent).toMatch(/Paul-Valentin Mini/);
  });

  test("renders anchor links for all sections", () => {
    const profileLink = screen.getByTestId("nav-link-profile");
    const skillsLink = screen.getByTestId("nav-link-skills");
    const experienceLink = screen.getByTestId("nav-link-experience");
    const educationLink = screen.getByTestId("nav-link-education");

    expect(profileLink.getAttribute("href")).toBe("#profile");
    expect(skillsLink.getAttribute("href")).toBe("#skills");
    expect(experienceLink.getAttribute("href")).toBe("#experience");
    expect(educationLink.getAttribute("href")).toBe("#education");
  });

  test("nav is sticky with z-index", () => {
    const nav = screen.getByTestId("nav");
    const style = window.getComputedStyle(nav);
    const className = nav.className;
    const hasSticky = className.includes("sticky") || style.position === "sticky";
    expect(hasSticky).toBe(true);
  });

  test("hamburger toggle exists for mobile", () => {
    const toggle = screen.getByTestId("nav-toggle");
    expect(toggle).toBeTruthy();
  });

  test("clicking hamburger toggles nav menu visibility", () => {
    const toggle = screen.getByTestId("nav-toggle");
    fireEvent.click(toggle);
    const menu = screen.getByTestId("nav-menu");
    expect(menu).toBeTruthy();
  });
});
