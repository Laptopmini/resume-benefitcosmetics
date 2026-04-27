import { render, screen } from "@testing-library/react";
import Education from "@/src/components/Education";
import { resume } from "@/src/content/resume";

describe("Education component", () => {
  beforeEach(() => {
    render(<Education />);
  });

  it("renders the education list", () => {
    const list = screen.getByTestId("education-list");
    expect(list).toBeInTheDocument();
    expect(list.tagName.toLowerCase()).toBe("ul");
  });

  it("renders all education items", () => {
    for (let i = 0; i < resume.education.length; i++) {
      expect(screen.getByTestId(`education-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders title and detail for each item", () => {
    for (let i = 0; i < resume.education.length; i++) {
      const title = screen.getByTestId(`education-title-${i}`);
      const detail = screen.getByTestId(`education-detail-${i}`);
      expect(title).toBeInTheDocument();
      expect(title.tagName.toLowerCase()).toBe("h3");
      expect(title).toHaveTextContent(resume.education[i].title);
      expect(detail).toBeInTheDocument();
      expect(detail.tagName.toLowerCase()).toBe("p");
      expect(detail).toHaveTextContent(resume.education[i].detail);
    }
  });

  it("renders status badge when status exists", () => {
    const withStatus = resume.education.filter((e) => e.status);
    expect(withStatus.length).toBeGreaterThan(0);

    for (let i = 0; i < resume.education.length; i++) {
      if (resume.education[i].status) {
        const badge = screen.getByTestId(`education-status-${i}`);
        expect(badge).toBeInTheDocument();
        expect(badge.tagName.toLowerCase()).toBe("span");
        expect(badge).toHaveTextContent(resume.education[i].status as string);
      }
    }
  });

  it("does not render status badge when status is undefined", () => {
    const firstItem = resume.education[0];
    expect(firstItem.status).toBeUndefined();
    expect(screen.queryByTestId("education-status-0")).not.toBeInTheDocument();
  });
});
