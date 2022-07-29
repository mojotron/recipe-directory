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
  test("renders recipe", async () => {
    render(<Recipe />);
    expect(await screen.findByText("Loading...")).toBeInTheDocument();
    const heading = await screen.findByRole("heading");
    expect(heading.textContent).toBe("Veggie Stew");
  });
});
