import { render, screen } from "@testing-library/react";
import Bar from "../components/Bar";
import "@testing-library/jest-dom";

const characters = [
  { id: "foo", name: "Waldo", found: false },
  { id: "bar", name: "Wenda", found: false },
  { id: "baz", name: "Wizard", found: false },
];

describe("characters", () => {
  it("displays all three", () => {
    render(<Bar characters={characters} />);
    expect(screen.getByText("Waldo")).toBeInTheDocument();
    expect(screen.getByText("Wenda")).toBeInTheDocument();
    expect(screen.getByText("Wizard")).toBeInTheDocument();
  });
  it("turns a character opaque if found", () => {
    characters[0].found = true;
    render(<Bar characters={characters} />);

    const waldo = screen.getByTestId("waldo");
    const wenda = screen.getByTestId("wenda");
    expect(waldo).toHaveClass("opaque");
    expect(wenda).not.toHaveClass("opaque");
  });
});
