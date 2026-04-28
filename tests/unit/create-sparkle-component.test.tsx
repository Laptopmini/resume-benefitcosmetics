import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock(
  "framer-motion",
  () => ({
    motion: {
      svg: React.forwardRef(
        (props: React.SVGAttributes<SVGSVGElement>, ref: React.Ref<SVGSVGElement>) => (
          <svg ref={ref} {...props} />
        ),
      ),
    },
  }),
  { virtual: true },
);

import Sparkle from "@/components/Sparkle";

describe("Sparkle component", () => {
  test("renders with data-testid sparkle", () => {
    render(<Sparkle />);
    expect(screen.getByTestId("sparkle")).toBeInTheDocument();
  });

  test("renders an SVG with viewBox 0 0 24 24", () => {
    render(<Sparkle />);
    const svg = screen.getByTestId("sparkle");
    expect(svg.tagName.toLowerCase()).toBe("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
  });

  test("contains 4-point sparkle path", () => {
    render(<Sparkle />);
    const svg = screen.getByTestId("sparkle");
    const path = svg.querySelector("path");
    expect(path).not.toBeNull();
    expect(path?.getAttribute("d")).toBe("M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z");
  });

  test("path is filled with gold-foil", () => {
    render(<Sparkle />);
    const svg = screen.getByTestId("sparkle");
    const path = svg.querySelector("path");
    expect(path).toHaveAttribute("fill", "var(--gold-foil)");
  });

  test("accepts custom size prop", () => {
    render(<Sparkle size={48} />);
    const svg = screen.getByTestId("sparkle");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });

  test("accepts className prop", () => {
    render(<Sparkle className="my-class" />);
    const svg = screen.getByTestId("sparkle");
    expect(svg).toHaveClass("my-class");
  });
});
