import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Nav = require("../../src/components/Nav").default;

describe("Navigation component", () => {
  beforeEach(() => {
    render(<Nav />);
  });

  it('renders nav with data-testid="nav"', () => {
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });

  it('renders brand name with data-testid="nav-brand"', () => {
    expect(screen.getByTestId("nav-brand")).toHaveTextContent("Paul-Valentin Mini");
  });

  it("renders all navigation links", () => {
    expect(screen.getByTestId("nav-link-profile")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-skills")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-experience")).toBeInTheDocument();
    expect(screen.getByTestId("nav-link-education")).toBeInTheDocument();
  });

  it("nav links have correct anchor hrefs", () => {
    expect(screen.getByTestId("nav-link-profile")).toHaveAttribute("href", "#profile");
    expect(screen.getByTestId("nav-link-skills")).toHaveAttribute("href", "#skills");
    expect(screen.getByTestId("nav-link-experience")).toHaveAttribute("href", "#experience");
    expect(screen.getByTestId("nav-link-education")).toHaveAttribute("href", "#education");
  });

  it('renders hamburger toggle with data-testid="nav-toggle"', () => {
    expect(screen.getByTestId("nav-toggle")).toBeInTheDocument();
  });

  describe("mobile menu", () => {
    it("hides nav-menu initially on mobile", () => {
      const menu = screen.queryByTestId("nav-menu");
      expect(menu).toBeNull();
    });

    it("shows nav-menu when hamburger is clicked", async () => {
      const user = userEvent.setup();
      const toggle = screen.getByTestId("nav-toggle");
      await user.click(toggle);
      expect(screen.getByTestId("nav-menu")).toBeInTheDocument();
    });
  });
});
