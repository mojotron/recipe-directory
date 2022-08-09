import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListItem from "../ListItem";

describe("Create page -> ItemList", () => {
  test("initial render", () => {
    render(
      <ListItem
        value={"apple"}
        index={null}
        handleDelete={jest.fn()}
        handleUpdate={jest.fn()}
      />
    );
    expect(screen.getByRole("listitem").className).toBe("ListItem");
    expect(screen.getByText(/apple/i)).toBeInTheDocument();
    const buttonElements = screen.getAllByRole("button");
    expect(buttonElements.length).toBe(2);
    expect(screen.getByAltText(/delete/i)).toBeInTheDocument();
    expect(screen.getByAltText(/edit/i)).toBeInTheDocument();
  });

  test("renders index when passed as prop", () => {
    render(
      <ListItem
        value={"add chopped apple"}
        index={1}
        handleDelete={jest.fn()}
        handleUpdate={jest.fn()}
      />
    );
    expect(screen.getByText("1. add chopped apple")).toBeInTheDocument();
  });

  test("change value", () => {
    render(
      <ListItem
        value={"apple"}
        index={null}
        handleDelete={jest.fn()}
        handleUpdate={jest.fn()}
      />
    );
    userEvent.click(screen.getByAltText("edit"));
    const inputElement = screen.getByTestId("list-item-input");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement.value).toBe("apple");
    expect(screen.getByAltText(/delete/i)).toBeInTheDocument();
    expect(screen.getByAltText(/update/i)).toBeInTheDocument();
    userEvent.type(inputElement, " x 2");
    expect(screen.getByTestId("list-item-input").value).toBe("apple x 2");
  });
});
