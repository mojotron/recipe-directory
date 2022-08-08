import { render, screen } from "@testing-library/react";
// import { rest } from "msw";
// import { setupServer } from "msw/lib/node";
import { BrowserRouter } from "react-router-dom";
import "whatwg-fetch";
import recipesDataMock from "../../../mocks/recipes.json";
import Home from "../Home";

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

// const server = setupServer(
//   rest.get("http://localhost:3000/recipes", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(recipesDataMock));
//   })
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());

describe("Home page", () => {
  test("", () => {});
  //   test("rest api data", async () => {
  //     render(<MockHome />);
  //     expect(await screen.findByText("Loading...")).toBeInTheDocument();
  //     const recipeElements = await screen.findAllByRole("heading");
  //     expect(recipeElements.length).toBe(3);
  //   });
  //   test("rest api reject", async () => {
  //     server.use(
  //       rest.get("http://localhost:3000/recipes", (req, res, ctx) => {
  //         return res(
  //           ctx.status(400),
  //           ctx.json({ message: "Could not fetch data!" })
  //         );
  //       })
  //     );
  //     render(<MockHome />);
  //     expect(
  //       await screen.findByText("Could not fetch data!")
  //     ).toBeInTheDocument();
  //   });
});
