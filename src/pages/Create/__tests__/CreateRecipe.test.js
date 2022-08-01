import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateRecipe from "../CreateRecipe";
import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.post("http://localhost:3000/recipes", (req, res, ctx) => {
    console.log("server");
    return res(
      ctx.json({
        title: "x",
        cookingTime: "45 minutes",
        method: "...",
        ingredients: [],
      })
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

const MockCreateRecipe = () => {
  return (
    <BrowserRouter>
      <CreateRecipe />
    </BrowserRouter>
  );
};

describe("CreateRecipe page", () => {
  test("renders page heading", () => {
    render(<MockCreateRecipe />);
    expect(screen.getByRole("heading").textContent).toMatch(
      /create new recipe/i
    );
  });
  test("renders form", () => {
    render(<MockCreateRecipe />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  test("renders form submit button", () => {
    render(<MockCreateRecipe />);
    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("title input element", () => {
    render(<MockCreateRecipe />);
    const titleInput = screen.getByLabelText("Title");
    expect(titleInput.value).toBe("");
    userEvent.type(titleInput, "pizza");
    expect(titleInput.value).toBe("pizza");
  });

  test("cooking time input element", () => {
    render(<MockCreateRecipe />);
    const timeInput = screen.getByLabelText("Cooking time (minutes)");
    expect(timeInput).toHaveAttribute("type", "number");
    expect(timeInput.value).toBe("");
    userEvent.type(timeInput, "hello");
    expect(timeInput.value).toBe("");
    userEvent.type(timeInput, "45"); // value must be number
    expect(timeInput.value).toBe("45");
  });

  test("cooking method textarea", () => {
    render(<MockCreateRecipe />);
    const methodInput = screen.getByLabelText("Describe cooking method");
    expect(methodInput.value).toBe("");
    userEvent.type(methodInput, "1. chop 5 carrots");
    expect(methodInput.value).toBe("1. chop 5 carrots");
  });

  test("render ingredients", () => {
    render(<MockCreateRecipe />);
    const ingInput = screen.getByLabelText("Ingredients");
    const addIngBtn = screen.getByRole("button", { name: "Add" });
    const ingList = screen.getByRole("list");
    expect(ingInput).toBeInTheDocument();
    expect(addIngBtn).toBeInTheDocument();
    expect(ingList).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toEqual([]);
    // empty click does't add ing
    userEvent.click(addIngBtn);
    expect(screen.queryAllByRole("listitem")).toEqual([]);
    // add ing
    userEvent.type(ingInput, "egg");
    userEvent.click(addIngBtn);
    expect(screen.getAllByRole("listitem")[0].textContent).toBe("egg");
    // stop adding same ing
    userEvent.type(ingInput, "egg");
    userEvent.click(addIngBtn);
    expect(screen.getAllByRole("listitem")[0].textContent).toBe("egg");
    userEvent.type(ingInput, "ham");
    userEvent.click(addIngBtn);
    expect(screen.getAllByRole("listitem").length).toBe(2);
    expect(ingInput).toHaveFocus();
  });

  test("post data", () => {
    // render(<MockCreateRecipe />);
    // userEvent.type(screen.getByLabelText("Title"), "pizza");
    // userEvent.type(screen.getByLabelText("Cooking time (minutes)"), "pizza");
    // userEvent.type(screen.getByLabelText("Describe cooking method"), "pizza");
    // userEvent.click(screen.getByRole("button", { name: /create/i }));
    // const x = await screen.findAllByRole("listitem");
    // expect(x.length).toBeGreaterThan(0);
    // TODO
  });
});
