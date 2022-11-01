import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../components/Game";
import { BrowserRouter, Routes, Route } from "react-router-dom";

describe("dropdown menu", () => {
  it("appears on image click", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </BrowserRouter>
    );
    const image = screen.getByTestId("game");

    fireEvent.click(image);
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
  });

  it("does not display after being clicked twice", () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
        </Routes>
      </BrowserRouter>
    );
    const image = screen.getByTestId("game");

    fireEvent.click(image);
    fireEvent.click(image);
    expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
  });
});
