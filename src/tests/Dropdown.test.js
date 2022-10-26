import { render, screen } from "@testing-library/react";
import Dropdown from "../components/Dropdown";
import "@testing-library/jest-dom";

jest.mock("../components/Dropdown", () => ({ characters, dropDisplay }) => (
  <>
    <div id="dropdown" data-testid="dropdown">
      {characters.map((character) => {
        return (
          <div key={character.id} id={character.id} onClick={dropDisplay}>
            {character.name}
          </div>
        );
      })}
    </div>
  </>
));

const characters = [
  { id: "foo", name: "Waldo" },
  { id: "bar", name: "Wenda" },
  { id: "baz", name: "Wizard" },
];

describe("dropdown menu", () => {
  render(<Dropdown characters={characters} />);

  it("contains all available characters", () => {
    expect(screen.getByText("Waldo")).toBeInTheDocument();
    expect(screen.getByText("Wenda")).toBeInTheDocument();
    expect(screen.getByText("Wizard")).toBeInTheDocument();
  });
});
