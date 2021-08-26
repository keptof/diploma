import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Todo } from "../Todo";
import { completedTodoAPI, removeTodoAPI } from "store/actions/Todo";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("Todo", () => {
  const props = {
    name: "TodoName",
    description: "TodoDescription",
    completed: true,
    id: "12345",
  };

  describe("should render with props", () => {
    it("should render element with name prop", () => {
      render(<Todo todo={props} />);
      const todoName = screen.getByText("TodoName");
      expect(todoName).toBeInTheDocument();
    });

    it("should be render out with a props and be hidden", () => {
      render(<Todo todo={props} />);
      const description = screen.queryByText("TodoDescription");
      expect(description).not.toBeInTheDocument();
    });

    it("should render with a completed props", () => {
      render(<Todo todo={props} />);
      const checkbox = screen.queryByTestId("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toEqual(props.completed);
    });
  });

  describe("dispatch()", () => {
    it("should call handlerToRemove() with id", () => {
      render(<Todo todo={props} />);
      fireEvent.click(screen.getByTestId("btn"));
      expect(mockDispatch).toHaveBeenCalledWith(
        removeTodoAPI({ id: props.id })
      );
    });

    it("should call handlerIsCompleted() with the opposite props", () => {
      render(<Todo todo={props} />);
      fireEvent.click(screen.getByTestId("checkbox"));
      expect(mockDispatch).toHaveBeenCalledWith(
        completedTodoAPI({
          id: props.id,
          completed: !props.completed,
        })
      );
    });
  });

  it("should toggle body visibility on click openTodoBody()", () => {
    render(<Todo todo={props} />);
    fireEvent.click(screen.getByTestId("title"));
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("title"));
    expect(description).not.toBeInTheDocument();
  });
});
