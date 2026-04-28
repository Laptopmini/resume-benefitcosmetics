import { render, screen } from "@testing-library/react";
import React from "react";
import SunburstDivider from "@/components/SunburstDivider";

describe("SunburstDivider component", () => {
  test("renders with data-testid sunburst-divider", () => {
    render(<SunburstDivider />);
    expect(screen.getByTestId("sunburst-divider")).toBeInTheDocument();
  });

  test("contains an SVG with viewBox 0 0 600 60", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("viewBox", "0 0 600 60");
  });

  test("SVG is aria-hidden", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  test("contains 24 polygon rays", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const polygons = container.querySelectorAll("polygon");
    expect(polygons).toHaveLength(24);
  });

  test("contains a horizontal rule line element", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const line = container.querySelector("line");
    expect(line).not.toBeNull();
    expect(line).toHaveAttribute("stroke", "var(--ink)");
    expect(line).toHaveAttribute("stroke-width", "3");
  });

  test("wrapper has centering and spacing classes", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const wrapper = container.closest("div");
    expect(wrapper).not.toBeNull();
    expect(wrapper?.className).toContain("flex");
    expect(wrapper?.className).toContain("justify-center");
  });
});
