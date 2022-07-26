import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../../context/ThemeContext";
import Navbar from "../Navbar";

const MockNavbar = () => {
  return (
    <BrowserRouter>
      <ThemeProvider value={{ color: "blue" }}>
        <Navbar />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe("Navbar component", () => {
  test("renders page headings", () => {
    render(<MockNavbar />);
    expect(
      screen.getByRole("heading", { name: /recipes directory/i })
    ).toBeInTheDocument();
  });
  test("heading is a link to home page", () => {
    render(<MockNavbar />);
    const homeLink = screen.getByRole("link", { name: /recipes directory/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });
  test("create recipe link", () => {
    render(<MockNavbar />);
    const createRecipeLink = screen.getByRole("link", {
      name: /create recipe/i,
    });
    expect(createRecipeLink).toHaveAttribute("href", "/create");
  });
});
