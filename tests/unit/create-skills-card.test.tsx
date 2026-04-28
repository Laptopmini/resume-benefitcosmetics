import { render, screen } from "@testing-library/react";
import type React from "react";
import { COPY, SKILL_GROUPS } from "@/content/resume";

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

describe("SkillsCard", () => {
  let SkillsCard: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/SkillsCard");
    SkillsCard = mod.default;
  });

  it("renders the skills card section with eyebrow and all skill groups", () => {
    render(<SkillsCard />);

    const section = screen.getByTestId("skills-card");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.className).toContain("editorial-card");
    expect(section.className).toContain("bg-mint");

    expect(screen.getByText(COPY.skillsLabel)).toBeInTheDocument();

    const groups = screen.getAllByTestId("skill-group");
    expect(groups.length).toBeGreaterThanOrEqual(SKILL_GROUPS.length);

    for (const group of SKILL_GROUPS) {
      expect(screen.getAllByText(group.label).length).toBeGreaterThanOrEqual(1);
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("duplicates items for seamless marquee loop", () => {
    render(<SkillsCard />);
    const groups = screen.getAllByTestId("skill-group");
    expect(groups.length).toBeGreaterThanOrEqual(SKILL_GROUPS.length * 2);
  });
});
