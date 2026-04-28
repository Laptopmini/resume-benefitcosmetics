import { render, screen, within } from "@testing-library/react";
import React from "react";

jest.mock("framer-motion", () => ({
  motion: {
    span: React.forwardRef(
      (props: React.HTMLAttributes<HTMLSpanElement>, ref: React.Ref<HTMLSpanElement>) => (
        <span ref={ref} {...props} />
      ),
    ),
  },
}));

import SiteNav from "@/components/SiteNav";

describe("SiteNav", () => {
  beforeEach(() => {
    render(<SiteNav />);
  });

  it("renders a nav element with data-testid site-nav", () => {
    const nav = screen.getByTestId("site-nav");
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe("NAV");
  });

  it("has sticky positioning classes", () => {
    const nav = screen.getByTestId("site-nav");
    expect(nav.className).toMatch(/sticky/);
    expect(nav.className).toMatch(/top-0/);
    expect(nav.className).toMatch(/z-40/);
  });

  it("renders the brand text P-V Mini", () => {
    expect(screen.getByText("P-V Mini")).toBeInTheDocument();
  });

  it("renders anchor links for all four sections", () => {
    const nav = screen.getByTestId("site-nav");
    const links = within(nav).getAllByRole("link");

    const expectedLinks = [
      { label: "Profile", href: "#profile" },
      { label: "Skills", href: "#skills" },
      { label: "Experience", href: "#experience" },
      { label: "Education", href: "#education" },
    ];

    expect(links).toHaveLength(4);

    expectedLinks.forEach(({ label, href }) => {
      const link = within(nav).getByRole("link", { name: label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("wraps links in a ul element with correct classes", () => {
    const nav = screen.getByTestId("site-nav");
    const ul = nav.querySelector("ul");
    expect(ul).toBeInTheDocument();
    expect(ul!.className).toMatch(/flex/);
    expect(ul!.className).toMatch(/font-mono/);
    expect(ul!.className).toMatch(/uppercase/);
  });

  it("does not render any section component content", () => {
    expect(screen.queryByTestId("profile-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("skills-card")).not.toBeInTheDocument();
    expect(screen.queryByTestId("site-footer")).not.toBeInTheDocument();
  });
});
