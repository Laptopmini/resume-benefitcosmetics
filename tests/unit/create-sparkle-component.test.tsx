import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("framer-motion", () => ({
  motion: {
    svg: React.forwardRef((props: Record<string, unknown>, ref: React.Ref<SVGSVGElement>) => {
      const { children, ...rest } = props;
      return (
        <svg ref={ref} {...rest}>
          <title>sparkle</title>
          {children as React.ReactNode}
        </svg>
      );
    }),
  },
}));

import Sparkle from "@/components/Sparkle";

describe("Sparkle", () => {
  it("renders with data-testid sparkle", () => {
    render(<Sparkle />);
    expect(screen.getByTestId("sparkle")).toBeInTheDocument();
  });

  it("renders an SVG with viewBox 0 0 24 24", () => {
    render(<Sparkle />);
    const svg = screen.getByTestId("sparkle");
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  it("contains the 4-point sparkle path", () => {
    render(<Sparkle />);
    const svg = screen.getByTestId("sparkle");
    const path = svg.querySelector("path");
    expect(path).not.toBeNull();
    expect(path?.getAttribute("d")).toContain("M12 0");
    expect(path?.getAttribute("fill")).toBe("var(--gold-foil)");
  });

  it("accepts custom size prop", () => {
    render(<Sparkle size={48} />);
    const svg = screen.getByTestId("sparkle");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });

  it("accepts custom className prop", () => {
    render(<Sparkle className="extra" />);
    const svg = screen.getByTestId("sparkle");
    expect(svg.className).toContain("extra");
  });
});
