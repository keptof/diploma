import { todoReducers } from "../Todos";
import {
  addTodoUI,
  completedTodoUI,
  removeTodoUI,
  setTodo,
} from "store/actions/Todo";
import { TodoModel } from "models/todoModel";

describe("TodosReducers()", () => {
  let initialEmptyStateTodo: Array<TodoModel>;
  let initialNoEmptyStateTodo: Array<TodoModel>;

  beforeEach(() => {
    initialEmptyStateTodo = [];
    initialNoEmptyStateTodo = [
      {
        name: "TypeScript",
        description: "Type",
        id: "1234",
        completed: false,
      },
    ];
  });

  it("should remove empty state", () => {
    const updateState = todoReducers(initialEmptyStateTodo, setTodo([]));

    expect(updateState).toEqual([]);
  });

  it("should should set todos", () => {
    const todos = [
      {
        name: "TypeScript",
        description: "Type",
        _id: "1234",
        completed: false,
      },
    ];

    const updateState = todoReducers(initialEmptyStateTodo, setTodo(todos));

    expect(updateState).toEqual(todos);
  });

  it("should add todo in data", () => {
    const todo = {
      name: "TypeScript",
      description: "Type",
      _id: "1234",
      completed: false,
    };

    const updateState = todoReducers(initialEmptyStateTodo, addTodoUI(todo));

    expect(updateState).toEqual([todo]);
  });

  it("should remove todo from data", () => {
    const updateState = todoReducers(
      initialNoEmptyStateTodo,
      removeTodoUI({ id: "1234" })
    );

    expect(updateState).toEqual([]);
  });

  it("should return todo with changed state completed", () => {
    const todo = {
      name: "TypeScript",
      description: "Type",
      id: "1234",
      completed: true,
    };
    const updateState = todoReducers(
      initialNoEmptyStateTodo,
      completedTodoUI(todo)
    );

    expect(updateState).toEqual([todo]);
  });
});
