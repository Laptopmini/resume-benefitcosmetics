import { render, screen } from "@testing-library/react";
import type React from "react";
import { COPY, EDUCATION } from "@/content/resume";

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

describe("EducationCard", () => {
  let EducationCard: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/EducationCard");
    EducationCard = mod.default;
  });

  it("renders the education card with eyebrow and all education entries", () => {
    render(<EducationCard />);

    const section = screen.getByTestId("education-card");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.className).toContain("editorial-card");
    expect(section.className).toContain("bg-mustard");

    expect(screen.getByText(COPY.educationLabel)).toBeInTheDocument();

    const entries = screen.getAllByTestId("education-entry");
    expect(entries).toHaveLength(EDUCATION.length);

    for (let i = 0; i < EDUCATION.length; i++) {
      expect(entries[i].tagName.toLowerCase()).toBe("li");
      expect(entries[i]).toHaveTextContent(EDUCATION[i].line);
    }
  });

  it("renders a Sparkle icon for each education entry", () => {
    render(<EducationCard />);
    const sparkles = screen.getAllByTestId("sparkle");
    expect(sparkles.length).toBeGreaterThanOrEqual(EDUCATION.length);
  });
});
