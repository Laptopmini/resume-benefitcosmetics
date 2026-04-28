import { render, screen } from "@testing-library/react";
import type React from "react";
import { COPY, PROFILE } from "@/content/resume";

jest.mock("framer-motion", () => {
  const React = require("react");
  const motion = new Proxy(
    {},
    {
      get: (_target: unknown, prop: string) =>
        React.forwardRef((props: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
          const { children, animate, transition, initial, whileHover, style, ...rest } = props;
          return React.createElement(prop, { ...rest, style, ref }, children);
        }),
    },
  );
  return {
    __esModule: true,
    motion,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => ({ get: () => 0 }),
  };
});

jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: Record<string, unknown>) => React.createElement("img", props),
  };
});

describe("BannerHero", () => {
  let BannerHero: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/BannerHero");
    BannerHero = mod.default;
  });

  it("renders the hero section with name and tagline from resume data", () => {
    render(<BannerHero />);
    const section = screen.getByTestId("hero");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");

    const name = screen.getByTestId("hero-name");
    expect(name).toBeInTheDocument();
    expect(name.tagName.toLowerCase()).toBe("h1");
    expect(name).toHaveTextContent(PROFILE.name);

    const tagline = screen.getByTestId("hero-tagline");
    expect(tagline).toBeInTheDocument();
    expect(tagline.tagName.toLowerCase()).toBe("p");
    expect(tagline).toHaveTextContent(COPY.heroTagline);
  });

  it("renders a profile image with correct alt text and src using withBasePath", () => {
    render(<BannerHero />);
    const img = screen.getByAltText(PROFILE.name);
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("profile.png");
  });

  it("renders the hero eyebrow text from COPY inside a Starburst", () => {
    render(<BannerHero />);
    expect(screen.getByText(COPY.heroEyebrow)).toBeInTheDocument();
    expect(screen.getByTestId("starburst")).toBeInTheDocument();
  });

  it("renders Sparkle components", () => {
    render(<BannerHero />);
    const sparkles = screen.getAllByTestId("sparkle");
    expect(sparkles.length).toBeGreaterThanOrEqual(3);
  });

  it("has correct styling classes on the hero section", () => {
    render(<BannerHero />);
    const section = screen.getByTestId("hero");
    expect(section.className).toContain("bg-rose");
    expect(section.className).toContain("text-cream");
  });
});
