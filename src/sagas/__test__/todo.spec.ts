import { call, put } from "redux-saga/effects";
import { addTodo, completedTodo, getTodos, removeTodo } from "services/todo";
import {
  setTodo,
  addTodoUI,
  removeTodoUI,
  completedTodoUI,
} from "store/actions/Todo";
import { TodoModel } from "models/todoModel";
import {
  addTodoWorker,
  fetchTodoWorker,
  removeTodoWorker,
  completeTodoWorker,
} from "../Todo";
import { loadingEnd, loadingStart } from "store/actions/Loader";
import { restError } from "store/actions/Error";

describe("Sagas Todo List", () => {
  const newTodo = {
    name: "ts",
    description: "js",
    completed: false,
  };

  const todo: TodoModel = {
    name: "ts",
    description: "js",
    completed: false,
    _id: "1234",
  };

  const todoModel = {
    name: "ts",
    description: "js",
    completed: false,
    _id: "1234",
    id: "1234",
  };

  const todoCompleted = {
    name: "ts",
    description: "js",
    completed: true,
    _id: "1234",
    id: "1234",
  };

  describe("fetchTodoWorker()", () => {
    const generator = fetchTodoWorker();

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should make call for fetching todos", () => {
      const result = generator.next().value;
      expect(result).toEqual(call(getTodos));
    });

    it("should create a todo list by todoModel", () => {
      const result = generator.next([todo]).value;
      expect(result).toEqual(put(setTodo([todoModel])));
    });

    it(
      "should must dispatch the loading action" +
        " finish with the value false",
      () => {
        const result = generator.next([todo]).value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an error", () => {
      generator.next().value;
      const error = "error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });

  describe("addTodoWorker()", () => {
    const generator = addTodoWorker({ payload: newTodo });

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should return a new todo from the server", () => {
      const result = generator.next(newTodo).value;
      expect(result).toEqual(call(addTodo, newTodo));
    });

    it("should put a addTodoUI with new todo by todo model", () => {
      const result = generator.next(todo).value;
      expect(result).toEqual(put(addTodoUI(todoModel)));
    });

    it(
      "should must dispatch the loading action" +
        " finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an error", () => {
      generator.next().value;
      const error = "error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });

  describe("removeTodoWorker()", () => {
    const generator = removeTodoWorker({
      payload: { id: todo._id! },
    });

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should make a server request", () => {
      const id = todo._id!;
      const result = generator.next().value;
      expect(result).toEqual(call(removeTodo, id));
    });

    it("should put removeTodoUI with id", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(removeTodoUI({ id: todo._id! })));
    });

    it(
      "should must dispatch the loading action" +
        " finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an error", () => {
      generator.next().value;
      const error = "error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });

  describe("completedTodoWorker", () => {
    const generator = completeTodoWorker({
      payload: {
        id: todo._id!,
        completed: !todo.completed,
      },
    });

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("must return there with a modified completed", () => {
      const id = todo._id!;
      const completed = true;
      const result = generator.next(todoCompleted).value;
      expect(result).toEqual(call(completedTodo, id, completed));
    });

    it("should put a completedTodoUI with new todo by todo model", () => {
      const result = generator.next(todoCompleted).value;
      expect(result).toEqual(put(completedTodoUI(todoCompleted)));
    });

    it(
      "should must dispatch the loading action " +
        "finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an error", () => {
      generator.next().value;
      const error = "error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });
});
