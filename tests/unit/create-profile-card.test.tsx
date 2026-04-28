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
  return { __esModule: true, motion };
});

describe("ProfileCard", () => {
  let ProfileCard: React.ComponentType;

  beforeEach(async () => {
    const mod = await import("@/components/ProfileCard");
    ProfileCard = mod.default;
  });

  it("renders the profile card section with eyebrow, heading, and summary from resume data", () => {
    render(<ProfileCard />);

    const section = screen.getByTestId("profile-card");
    expect(section).toBeInTheDocument();
    expect(section.tagName.toLowerCase()).toBe("section");
    expect(section.className).toContain("editorial-card");
    expect(section.className).toContain("bg-blush");

    expect(screen.getByText(COPY.profileLabel)).toBeInTheDocument();
    expect(screen.getByText(COPY.profileHeading)).toBeInTheDocument();

    const summary = screen.getByTestId("profile-summary");
    expect(summary).toBeInTheDocument();
    expect(summary.tagName.toLowerCase()).toBe("p");
    expect(summary).toHaveTextContent(PROFILE.summary);
  });

  it("uses the correct typography classes", () => {
    render(<ProfileCard />);

    const label = screen.getByText(COPY.profileLabel);
    expect(label.className).toContain("font-script");
    expect(label.className).toContain("text-rose");

    const heading = screen.getByText(COPY.profileHeading);
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading.className).toContain("font-display");
  });
});
