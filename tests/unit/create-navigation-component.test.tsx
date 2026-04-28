import { render, screen } from "@testing-library/react";
import "./setup";
import Nav from "@/components/Nav";

describe("Nav component", () => {
  it("renders nav element", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it("renders brand name", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-brand")).toHaveTextContent("Paul-Valentin Mini");
  });

  it("renders all anchor links", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("renders hamburger toggle button", () => {
    render(<Nav />);
    expect(screen.getByTestId("nav-toggle")).toBeInTheDocument();
  });
});
