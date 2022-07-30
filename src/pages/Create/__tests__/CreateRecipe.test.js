import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateRecipe from "../CreateRecipe";

describe("CreateRecipe page", () => {
  test("renders page heading", () => {
    render(<CreateRecipe />);
    expect(screen.getByRole("heading").textContent).toMatch(
      /create new recipe/i
    );
  });
  test("renders form", () => {
    render(<CreateRecipe />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  test("renders form submit button", () => {
    render(<CreateRecipe />);
    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("title input element", () => {
    render(<CreateRecipe />);
    const titleInput = screen.getByLabelText("Title");
    expect(titleInput.value).toBe("");
    userEvent.type(titleInput, "pizza");
    expect(titleInput.value).toBe("pizza");
  });

  test("cooking time input element", () => {
    render(<CreateRecipe />);
    const timeInput = screen.getByLabelText("Cooking time (minutes)");
    expect(timeInput).toHaveAttribute("type", "number");
    expect(timeInput.value).toBe("");
    userEvent.type(timeInput, "hello");
    expect(timeInput.value).toBe("");
    userEvent.type(timeInput, "45"); // value must be number
    expect(timeInput.value).toBe("45");
  });

  test("cooking method textarea", () => {
    render(<CreateRecipe />);
    const methodInput = screen.getByLabelText("Describe cooking method");
    expect(methodInput.value).toBe("");
    userEvent.type(methodInput, "1. chop 5 carrots");
    expect(methodInput.value).toBe("1. chop 5 carrots");
  });

  test("render ingredients", () => {
    render(<CreateRecipe />);
    const ingInput = screen.getByLabelText("Ingredients");
    const addIngBtn = screen.getByRole("button", { name: "Add Ingredient" });
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
});
