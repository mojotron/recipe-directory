import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "../SearchBar";

describe("SearchBar component", () => {
  test("renders form", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  test("render label/input field", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id", "search");
  });
  test("change input value", () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const searchBar = screen.getByLabelText(/search/i);
    expect(searchBar.value).toBe("");
    userEvent.type(searchBar, "pizza");
    expect(searchBar.value).toBe("pizza");
  });
});
