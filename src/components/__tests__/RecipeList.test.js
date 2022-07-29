import { render, screen } from "@testing-library/react";
import RecipeList from "../RecipeList";
import recipeDataMock from "../../mocks/recipes.json";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";

describe("RecipeList component", () => {
  test("renders recipe elements", () => {
    render(
      <MemoryRouter>
        <RecipeList recipes={recipeDataMock} />
      </MemoryRouter>
    );
    const recipeElements = screen.getAllByRole("heading");
    expect(recipeElements.length).toBe(3);
    expect(recipeElements[1].textContent).toBe("Veggie Pizza");
  });
  test("links paths to recipes", () => {
    render(
      <MemoryRouter>
        <RecipeList recipes={recipeDataMock} />
      </MemoryRouter>
    );
    const linkElements = screen.getAllByRole("link");
    expect(linkElements[0]).toHaveAttribute("href", "/recipes/1");
    expect(linkElements[1]).toHaveAttribute("href", "/recipes/2");
    expect(linkElements[2]).toHaveAttribute("href", "/recipes/3");
  });
});
