import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as reactRedux from "react-redux";
import { AddTodo } from "../AddTodo";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector,
}));
const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

describe("< AddTodo />", () => {
  beforeEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });
  const props = {
    onTodoAdded: jest.fn(),
  };

  describe("display on page", () => {
    it("input should render on page", () => {
      render(<AddTodo {...props} />);

      const input = screen.getByTestId("input");
      expect(input).toBeInTheDocument();
    });

    it("textarea should render on page", () => {
      render(<AddTodo {...props} />);

      const textarea = screen.getByTestId("textarea");
      expect(textarea).toBeInTheDocument();
    });

    it("button should render on page", () => {
      render(<AddTodo {...props} />);

      const btn = screen.getByTestId("btn");
      expect(btn).toBeInTheDocument();
    });

    it("warning to plan shouldn`t render", () => {
      render(<AddTodo {...props} />);

      const elem = screen.queryByTestId("warningToPlan");
      expect(elem).not.toBeInTheDocument();
    });

    it("warning to empty string shouldn`t render", () => {
      render(<AddTodo {...props} />);

      const elem = screen.queryByTestId("emptyString");
      expect(elem).not.toBeInTheDocument();
    });
  });

  it("should update todo.name", () => {
    render(<AddTodo {...props} />);
    const newValue = "TypeScript";
    const input = screen.getByTestId("input") as HTMLInputElement;
    fireEvent.change(input, {
      target: {
        value: newValue,
      },
    });

    expect(input.value).toBe(newValue);
  });

  it("should update todo.description", () => {
    render(<AddTodo {...props} />);
    const newValue = "TypeScript";
    const textarea = screen.getByTestId("textarea") as HTMLInputElement;
    fireEvent.change(textarea, {
      target: {
        value: newValue,
      },
    });

    expect(textarea.value).toBe(newValue);
  });

  describe("submitHandler()", () => {
    it(
      "with an empty name input," +
        " it should show an error that the fields are empty",
      () => {
        render(<AddTodo {...props} />);
        const input = screen.getByTestId("input");
        fireEvent.change(input, {
          target: {
            value: "",
          },
        });
        fireEvent.submit(screen.getByTestId("form"));
        const emptyFieldWarning = screen.queryByTestId("emptyFieldWarning");
        expect(emptyFieldWarning).toBeInTheDocument();
      }
    );

    it(
      "with an empty description textarea," +
        " it should show an error that the fields are empty",
      () => {
        render(<AddTodo {...props} />);
        const textarea = screen.getByTestId("textarea");
        fireEvent.change(textarea, {
          target: {
            value: "",
          },
        });
        fireEvent.submit(screen.getByTestId("form"));
        const emptyFieldWarning = screen.queryByTestId("emptyFieldWarning");
        expect(emptyFieldWarning).toBeInTheDocument();
      }
    );
  });
});
