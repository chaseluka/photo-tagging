import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Leaderboard from "../components/Leaderboard";

describe("score", () => {
  const score = 8;
  it("is rendered on screen", () => {
    render(<Leaderboard score={score} />);
    const scoreDisplay = screen.getByText("Your Score", { exact: false });

    expect(scoreDisplay).toBeInTheDocument();
    expect(scoreDisplay.textContent).toMatch("Your Score: 8s");
  });
});
