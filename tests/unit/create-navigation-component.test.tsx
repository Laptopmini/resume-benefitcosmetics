import { render } from "@testing-library/react";
import Nav from "../../../src/components/Nav";

describe("Nav component", () => {
  it('renders nav element with data-testid="nav"', () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav")).toBeInTheDocument();
  });

  it('displays brand name with data-testid="nav-brand"', () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-brand")).toBeInTheDocument();
    expect(getByTestId("nav-brand")).toHaveTextContent("Paul-Valentin Mini");
  });

  it("renders navigation links with correct data-testids", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("renders anchor links pointing to correct section ids", () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-link-profile").getAttribute("href")).toBe("#profile");
    expect(getByTestId("nav-link-skills").getAttribute("href")).toBe("#skills");
    expect(getByTestId("nav-link-experience").getAttribute("href")).toBe("#experience");
    expect(getByTestId("nav-link-education").getAttribute("href")).toBe("#education");
  });

  it('renders hamburger toggle button with data-testid="nav-toggle"', () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-toggle")).toBeInTheDocument();
  });

  it('renders dropdown menu with data-testid="nav-menu"', () => {
    const { getByTestId } = render(<Nav />);
    expect(getByTestId("nav-menu")).toBeInTheDocument();
  });
});
