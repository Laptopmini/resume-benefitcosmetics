import { fireEvent, render, screen } from "@testing-library/react";
import { Nav } from "@/components/Nav";

describe("Nav component", () => {
  it('renders nav with data-testid="nav"', () => {
    render(<Nav />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it('renders brand name with data-testid="nav-brand"', () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-brand")).toBeInTheDocument();
    expect(screen.getByTestId("nav-brand").textContent).toBe("Paul-Valentin Mini");
  });

  it("renders navigation links with correct test IDs", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("renders anchor links pointing to correct sections", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile").getAttribute("href")).toBe("#profile");
    expect(screen.getByTestId("nav-link-skills").getAttribute("href")).toBe("#skills");
    expect(screen.getByTestId("nav-link-experience").getAttribute("href")).toBe("#experience");
    expect(screen.getByTestId("nav-link-education").getAttribute("href")).toBe("#education");
  });

  it("has sticky positioning and blur background styles", () => {
    render(<Nav />);
    const nav = screen.getByTestId("nav");
    const styles = getComputedStyle(nav);
    expect(styles.position).toBe("sticky");
    expect(styles.top).toBe("0");
    expect(styles.zIndex).toBe("50");
    expect(styles.backdropFilter).toContain("blur");
  });

  it("renders hamburger toggle button on mobile", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-toggle")).toBeInTheDocument();
  });

  it("toggles dropdown menu when hamburger is clicked", () => {
    render(<Nav />);
    const toggle = screen.getByTestId("nav-toggle");
    const menu = screen.getByTestId("nav-menu");

    // Initially menu should be hidden (not visible)
    expect(menu).not.toBeVisible();

    // Click hamburger to show menu
    fireEvent.click(toggle);
    expect(menu).toBeVisible();

    // Click again to hide menu
    fireEvent.click(toggle);
    expect(menu).not.toBeVisible();
  });
});
