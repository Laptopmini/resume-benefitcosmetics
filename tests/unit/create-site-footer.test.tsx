import { render, screen } from "@testing-library/react";
import type React from "react";
import { COPY, PROFILE } from "@/content/resume";

describe("SiteFooter", () => {
  let SiteFooter: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/SiteFooter");
    SiteFooter = mod.default;
  });

  it("renders the footer with tagline from COPY and contact links from PROFILE", () => {
    render(<SiteFooter />);

    const footer = screen.getByTestId("site-footer");
    expect(footer).toBeInTheDocument();
    expect(footer.tagName.toLowerCase()).toBe("footer");
    expect(footer.className).toContain("bg-ink");
    expect(footer.className).toContain("text-cream");

    const tagline = screen.getByTestId("footer-tagline");
    expect(tagline).toBeInTheDocument();
    expect(tagline).toHaveTextContent(COPY.footerLine);

    const emailLink = screen.getByRole("link", { name: /email/i });
    expect(emailLink).toHaveAttribute("href", `mailto:${PROFILE.email}`);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute("href", PROFILE.linkedin);

    const githubLink = screen.getByRole("link", { name: /github/i });
    expect(githubLink).toHaveAttribute("href", PROFILE.github);
  });

  it("has no framer-motion dependency (server component)", () => {
    render(<SiteFooter />);
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
  });
});
