/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/src/components/Nav";

describe("Nav component", () => {
  beforeEach(() => {
    render(<Nav />);
  });

  it("renders nav with data-testid=nav", () => {
    expect(screen.getByTestId("nav")).toBeDefined();
  });

  it("renders brand name", () => {
    const brand = screen.getByTestId("nav-brand");
    expect(brand).toBeDefined();
    expect(brand.textContent).toContain("Paul-Valentin Mini");
  });

  it("renders anchor links for all sections", () => {
    const profileLink = screen.getByTestId("nav-link-profile");
    const skillsLink = screen.getByTestId("nav-link-skills");
    const experienceLink = screen.getByTestId("nav-link-experience");
    const educationLink = screen.getByTestId("nav-link-education");

    expect(profileLink).toBeDefined();
    expect(skillsLink).toBeDefined();
    expect(experienceLink).toBeDefined();
    expect(educationLink).toBeDefined();
  });

  it("links point to correct anchors", () => {
    expect(screen.getByTestId("nav-link-profile").getAttribute("href")).toBe("#profile");
    expect(screen.getByTestId("nav-link-skills").getAttribute("href")).toBe("#skills");
    expect(screen.getByTestId("nav-link-experience").getAttribute("href")).toBe("#experience");
    expect(screen.getByTestId("nav-link-education").getAttribute("href")).toBe("#education");
  });

  it("has sticky positioning", () => {
    const nav = screen.getByTestId("nav");
    const style = window.getComputedStyle(nav);
    const classList = nav.className;
    expect(classList.includes("sticky") || style.position === "sticky").toBe(true);
  });

  it("renders hamburger toggle button", () => {
    const toggle = screen.getByTestId("nav-toggle");
    expect(toggle).toBeDefined();
  });

  it("toggles mobile menu on hamburger click", async () => {
    const user = userEvent.setup();
    const toggle = screen.getByTestId("nav-toggle");
    await user.click(toggle);
    const menu = screen.getByTestId("nav-menu");
    expect(menu).toBeDefined();
  });
});
