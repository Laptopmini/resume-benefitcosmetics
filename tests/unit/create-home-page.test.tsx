import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("framer-motion", () => ({
  motion: {
    span: React.forwardRef(
      (props: React.HTMLAttributes<HTMLSpanElement>, ref: React.Ref<HTMLSpanElement>) => (
        <span ref={ref} {...props} />
      ),
    ),
    div: React.forwardRef(
      (props: React.HTMLAttributes<HTMLDivElement>, ref: React.Ref<HTMLDivElement>) => (
        <div ref={ref} {...props} />
      ),
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("@/components/SiteNav", () => {
  return { __esModule: true, default: () => <div data-testid="site-nav" /> };
});
jest.mock("@/components/BannerHero", () => {
  return { __esModule: true, default: () => <div data-testid="banner-hero" /> };
});
jest.mock("@/components/ProfileCard", () => {
  return { __esModule: true, default: () => <div data-testid="profile-card" /> };
});
jest.mock("@/components/SkillsCard", () => {
  return { __esModule: true, default: () => <div data-testid="skills-card" /> };
});
jest.mock("@/components/ExperienceTimeline", () => {
  return { __esModule: true, default: () => <div data-testid="experience-timeline" /> };
});
jest.mock("@/components/EducationCard", () => {
  return { __esModule: true, default: () => <div data-testid="education-card" /> };
});
jest.mock("@/components/SiteFooter", () => {
  return { __esModule: true, default: () => <div data-testid="site-footer" /> };
});
jest.mock("@/components/SunburstDivider", () => {
  return { __esModule: true, default: () => <hr data-testid="sunburst-divider" /> };
});

import Home from "@/app/page";

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders a root wrapper with data-testid home-root", () => {
    const root = screen.getByTestId("home-root");
    expect(root).toBeInTheDocument();
  });

  it("renders SiteNav", () => {
    expect(screen.getByTestId("site-nav")).toBeInTheDocument();
  });

  it("renders all section components", () => {
    expect(screen.getByTestId("banner-hero")).toBeInTheDocument();
    expect(screen.getByTestId("profile-card")).toBeInTheDocument();
    expect(screen.getByTestId("skills-card")).toBeInTheDocument();
    expect(screen.getByTestId("experience-timeline")).toBeInTheDocument();
    expect(screen.getByTestId("education-card")).toBeInTheDocument();
  });

  it("renders SiteFooter", () => {
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
  });

  it("renders exactly four SunburstDivider instances", () => {
    const dividers = screen.getAllByTestId("sunburst-divider");
    expect(dividers).toHaveLength(4);
  });

  it("contains a main element with correct classes", () => {
    const root = screen.getByTestId("home-root");
    const main = root.querySelector("main");
    expect(main).toBeInTheDocument();
    expect(main!.className).toMatch(/max-w-editorial/);
    expect(main!.className).toMatch(/px-6/);
    expect(main!.className).toMatch(/py-12/);
  });

  it("wraps each section in a section element with correct id", () => {
    const sectionIds = ["profile", "skills", "experience", "education"];
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      expect(section).not.toBeNull();
      expect(section!.tagName).toBe("SECTION");
      expect(section!.className).toMatch(/py-24/);
    }
  });

  it("renders sections in correct order within main", () => {
    const root = screen.getByTestId("home-root");
    const main = root.querySelector("main")!;
    const testIds = Array.from(main.querySelectorAll("[data-testid]")).map((el) =>
      el.getAttribute("data-testid"),
    );

    const expectedOrder = [
      "banner-hero",
      "sunburst-divider",
      "profile-card",
      "sunburst-divider",
      "skills-card",
      "sunburst-divider",
      "experience-timeline",
      "sunburst-divider",
      "education-card",
    ];

    const filtered = testIds.filter((id) => expectedOrder.includes(id!));
    expect(filtered).toEqual(expectedOrder);
  });

  it("SiteNav is outside main and SiteFooter is outside main", () => {
    const root = screen.getByTestId("home-root");
    const main = root.querySelector("main")!;
    const nav = screen.getByTestId("site-nav");
    const footer = screen.getByTestId("site-footer");
    expect(main.contains(nav)).toBe(false);
    expect(main.contains(footer)).toBe(false);
  });
});
