import { TodoModel } from "models/todoModel";

export const isTaskInList = (todos: TodoModel[], title: string): boolean =>
  todos.some(({ name }) => name.toLowerCase() === title.toLowerCase());
