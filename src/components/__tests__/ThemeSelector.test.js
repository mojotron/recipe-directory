import { render, screen } from "@testing-library/react";
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
  test("render", async () => {
    render(<MockThemeSelector />);
    const btns = await screen.findAllByRole("button");
    expect(btns.length).toBe(3);
  });
});
