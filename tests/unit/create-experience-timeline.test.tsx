import { render, screen } from "@testing-library/react";
import type React from "react";
import { COPY, EXPERIENCE } from "@/content/resume";

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
  return { __esModule: true, motion };
});

describe("ExperienceTimeline", () => {
  let ExperienceTimeline: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/ExperienceTimeline");
    ExperienceTimeline = mod.default;
  });

  it("renders the timeline section with eyebrow, heading, and all experience entries", () => {
    render(<ExperienceTimeline />);

    const section = screen.getByTestId("experience-timeline");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");

    expect(screen.getByText(COPY.experienceLabel)).toBeInTheDocument();
    expect(screen.getByText(COPY.experienceHeading)).toBeInTheDocument();

    const entries = screen.getAllByTestId("experience-entry");
    expect(entries).toHaveLength(EXPERIENCE.length);

    for (const entry of entries) {
      expect(entry.tagName.toLowerCase()).toBe("article");
      expect(entry.className).toContain("editorial-card");
    }
  });

  it("renders role, company, location, period, bullets, and tech stack for the first entry", () => {
    render(<ExperienceTimeline />);

    const first = EXPERIENCE[0];
    expect(screen.getByText(`${first.role} · ${first.company}`)).toBeInTheDocument();
    expect(screen.getAllByText(first.location).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(first.period)).toBeInTheDocument();

    for (const bullet of first.bullets) {
      expect(screen.getByText(bullet.heading)).toBeInTheDocument();
      expect(screen.getByText(bullet.body)).toBeInTheDocument();
    }

    for (const tech of first.stack) {
      expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("renders a Starburst for each entry containing the period", () => {
    render(<ExperienceTimeline />);
    const starbursts = screen.getAllByTestId("starburst");
    expect(starbursts.length).toBeGreaterThanOrEqual(EXPERIENCE.length);
  });
});
