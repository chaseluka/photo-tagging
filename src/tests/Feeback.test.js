import { render, screen } from "@testing-library/react";
import Feedback from "../components/Feedback";
import "@testing-library/jest-dom";

describe("feedback display", () => {
  it("shows as correct if a character was found", () => {
    const didFind = "correct";
    render(<Feedback didFind={didFind} />);

    const background = screen.getByTestId("background");

    expect(screen.getByText("Correct!")).toBeInTheDocument();
    expect(background).toHaveClass("correct");
  });
  it("shows as nice try if a character was not found", () => {
    const didFind = "incorrect";
    render(<Feedback didFind={didFind} />);
    const background = screen.getByTestId("background");

    expect(screen.getByText("Nice try!")).toBeInTheDocument();
    expect(background).toHaveClass("incorrect");
  });
});
