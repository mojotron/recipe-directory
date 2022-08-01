import { render, screen } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar component", () => {
  test("renders form", () => {
    render(<SearchBar />);
    expect(screen.getByRole("form")).toBeInDocument();
  });
});
