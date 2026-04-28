import { render, screen } from "@testing-library/react";
import React from "react";
import Starburst from "@/components/Starburst";

describe("Starburst component", () => {
  test("renders with data-testid starburst", () => {
    render(<Starburst />);
    expect(screen.getByTestId("starburst")).toBeInTheDocument();
  });

  test("contains an SVG with viewBox 0 0 200 200", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("viewBox", "0 0 200 200");
  });

  test("SVG contains a polygon for starburst rays", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).not.toBeNull();
  });

  test("polygon has default rose fill and ink stroke", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("fill", "var(--rose)");
    expect(polygon).toHaveAttribute("stroke", "var(--ink)");
    expect(polygon).toHaveAttribute("stroke-width", "3");
  });

  test("accepts custom fill prop", () => {
    render(<Starburst fill="var(--mustard)" />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("fill", "var(--mustard)");
  });

  test("renders children centered over the SVG", () => {
    render(<Starburst>Now Showing</Starburst>);
    const container = screen.getByTestId("starburst");
    expect(container).toHaveTextContent("Now Showing");
  });

  test("accepts className prop", () => {
    render(<Starburst className="custom-class" />);
    const container = screen.getByTestId("starburst");
    expect(container).toHaveClass("custom-class");
  });
});
