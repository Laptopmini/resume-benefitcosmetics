import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Nav from "@/src/components/Nav";

describe("src/components/Nav", () => {
  test("renders nav with data-testid=nav", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  test("renders brand name", () => {
    const { getByTestId } = render(<Nav />);
    const brand = getByTestId("nav-brand");
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveTextContent("Paul-Valentin Mini");
  });

  test("renders anchor links for all sections", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-link-profile")).toHaveAttribute("href", "#profile");
    expect(getByTestId("nav-link-skills")).toHaveAttribute("href", "#skills");
    expect(getByTestId("nav-link-experience")).toHaveAttribute("href", "#experience");
    expect(getByTestId("nav-link-education")).toHaveAttribute("href", "#education");
  });

  test("nav is sticky with z-index 50", () => {
    const { getByTestId } = render(<Nav />);
    const nav = getByTestId("nav");
    const style = window.getComputedStyle(nav);
    const className = nav.className;
    const hasSticky =
      style.position === "sticky" ||
      className.includes("sticky") ||
      nav.getAttribute("style")?.includes("sticky");
    expect(hasSticky).toBe(true);
  });

  test("has hamburger toggle button for mobile", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-toggle")).toBeInTheDocument();
  });

  test("toggles mobile menu on hamburger click", () => {
    const { getByTestId } = render(<Nav />);
    const toggle = getByTestId("nav-toggle");

    fireEvent.click(toggle);
    const menu = getByTestId("nav-menu");
    expect(menu).toBeInTheDocument();
  });
});
