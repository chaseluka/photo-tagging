import { fireEvent, render, screen } from "@testing-library/react";
import App from "../components/App";
import "@testing-library/jest-dom";

describe("dropdown menu", () => {
  it("appears on image click", () => {
    render(<App />);
    const image = screen.getByTestId("game");

    fireEvent.click(image);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  });

  it("does not display after being clicked twice", () => {
    render(<App />);
    const image = screen.getByTestId("game");

    fireEvent.click(image);
    fireEvent.click(image);
    expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
  });
});
