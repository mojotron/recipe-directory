import { render, screen } from "@testing-library/react";
import Recipe from "../Recipe";
import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import recipesDataMock from "../../../mocks/recipes.json";

const server = setupServer(
  rest.get("http://localhost:3000/recipes/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recipesDataMock[0]));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Recipe page", () => {
  test("renders headings", async () => {
    render(<Recipe />);
    // first render Loading...
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    // then after fetch recipe
    const recipeHeadings = await screen.findAllByRole("heading");
    expect(recipeHeadings[0].textContent).toBe("Veggie Stew");
    expect(recipeHeadings[1].textContent).toBe("Ingredients:");
    expect(recipeHeadings[2].textContent).toBe("Method:");
  });
  test("renders cooking time", async () => {
    render(<Recipe />);
    const cookingTime = await screen.findByText("Cooking time 45 minutes");
    expect(cookingTime).toBeInTheDocument();
  });
  test("renders ingredients list with elements", async () => {
    render(<Recipe />);
    const ingredientsList = await screen.findByRole("list");
    const ingredientsItems = await screen.findAllByRole("listitem");
    expect(ingredientsList).toBeInTheDocument();
    expect(ingredientsItems.length).toBe(4);
    expect(ingredientsItems[0].textContent).toBe("1 Carrot");
  });
  test("renders cooking method description", async () => {
    render(<Recipe />);
    const method = await screen.findByText(
      "1. Pre-heat the oven to 200C/3C/gas 5. Place the carrot, leek and tofu in a large bowl. Add the stock and mix well. 2. Add the rest of the ingredients and mix well. 3. Place the mixture in a large bowl and cover with a lid. 4. Place the lid on the oven and cook for 40 minutes. 5. Serve with a slaw of your choice"
    );
    expect(method).toBeInTheDocument();
  });
});
