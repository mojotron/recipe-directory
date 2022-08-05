import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "../../context/ThemeContext";
import ThemeSelector from "../ThemeSelector";

const MockThemeSelector = () => {
  return (
    <ThemeProvider>
      <ThemeSelector />
    </ThemeProvider>
  );
};

describe("ThemeSelector component", () => {
  test("render theme buttons", () => {
    render(<MockThemeSelector />);
    expect(screen.getAllByRole("button").length).toBe(3);
  });
  test("renders mode image", () => {
    render(<MockThemeSelector />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
  test("toggle image", () => {
    render(<MockThemeSelector />);
    expect(screen.getByAltText("toggle on dark mode")).toBeInTheDocument();
    userEvent.click(screen.getByRole("img"));
    expect(screen.getByAltText("toggle off dark mode")).toBeInTheDocument();
  });
});
