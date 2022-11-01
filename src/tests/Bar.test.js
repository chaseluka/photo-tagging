import { render, screen /*within*/ } from "@testing-library/react";
import Bar from "../components/Bar";
import "@testing-library/jest-dom";
//import { watch } from "graceful-fs";
//import { act } from "react-dom/test-utils";

const characters = [
  { id: "foo", name: "waldo", found: false },
  { id: "bar", name: "wenda", found: false },
  { id: "baz", name: "wizard", found: false },
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

/*function waitForTimer(timer) {
  setTimeout(() => {
    expect(+timer.textContent).toBeGreaterThan(0);
  }, 2000);
}

jest.useFakeTimers();*/

describe("timer", () => {
  it("displays correctly", () => {
    render(<Bar characters={characters} />);
    const timer = screen.getByTestId("timer");

    expect(timer).toBeInTheDocument();
    expect(+timer.textContent).not.toBeNaN();
  });
  /*it("counts up", () => {
    act(() => {
      render(<Bar characters={characters} />);
    })
    
    const timer = screen.getByTestId("timer");

    act(() => {})
    waitForTimer(timer);

    jest.runAllTimers();
  });*/
});
