import { render, screen } from "@testing-library/react";
import SunburstDivider from "@/components/SunburstDivider";

describe("SunburstDivider", () => {
  it("renders with data-testid sunburst-divider", () => {
    render(<SunburstDivider />);
    expect(screen.getByTestId("sunburst-divider")).toBeInTheDocument();
  });

  it("renders an SVG with viewBox 0 0 600 60", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("viewBox", "0 0 600 60");
  });

  it("SVG is aria-hidden", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden");
  });

  it("contains polygon elements for rays", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const polygons = container.querySelectorAll("polygon");
    expect(polygons.length).toBe(24);
  });

  it("contains a horizontal rule line element", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    const line = container.querySelector("line");
    expect(line).not.toBeNull();
    expect(line).toHaveAttribute("stroke", "var(--ink)");
  });

  it("has full-width wrapper with centering", () => {
    render(<SunburstDivider />);
    const container = screen.getByTestId("sunburst-divider");
    expect(container.className).toContain("flex");
    expect(container.className).toContain("justify-center");
  });
});
