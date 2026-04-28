import { render, screen } from "@testing-library/react";
import Starburst from "@/components/Starburst";

describe("Starburst", () => {
  it("renders with data-testid starburst", () => {
    render(<Starburst />);
    expect(screen.getByTestId("starburst")).toBeInTheDocument();
  });

  it("renders an SVG with viewBox 0 0 200 200", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("viewBox", "0 0 200 200");
  });

  it("contains a polygon for the starburst shape", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).not.toBeNull();
  });

  it("uses default fill var(--rose)", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("fill", "var(--rose)");
  });

  it("uses ink stroke with strokeWidth 3", () => {
    render(<Starburst />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("stroke", "var(--ink)");
  });

  it("accepts custom fill prop", () => {
    render(<Starburst fill="var(--mustard)" />);
    const container = screen.getByTestId("starburst");
    const polygon = container.querySelector("polygon");
    expect(polygon).toHaveAttribute("fill", "var(--mustard)");
  });

  it("renders children centered over the SVG", () => {
    render(<Starburst>Now Showing</Starburst>);
    const container = screen.getByTestId("starburst");
    expect(container).toHaveTextContent("Now Showing");
  });
});
