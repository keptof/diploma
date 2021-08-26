import { createAction } from "typesafe-actions";
import { TodoModel } from "models/todoModel";

enum TodoActionTypes {
  FetchTodo = "fetchTodo",
  SetTodo = "setTodo",
  AddTodoAPI = "addTodoAPI",
  AddTodoUI = "addTodoUI",
  RemoveTodoAPI = "removeTodoAPI",
  RemoveTodoUI = "removeTodoUI",
  CompletedTodoAPI = "completedTodoAPI",
  CompletedTodoUI = " completedTodoUI",
}

type SetTodoPayload = Array<TodoModel>;

interface RemoveTodo {
  id: string;
}

export interface CompletedTodo {
  id: string;
  completed: boolean;
}

export const fetchTodo = createAction(TodoActionTypes.FetchTodo)();

export const setTodo = createAction(TodoActionTypes.SetTodo)<SetTodoPayload>();

export const addTodoAPI = createAction(TodoActionTypes.AddTodoAPI)<TodoModel>();

export const addTodoUI = createAction(TodoActionTypes.AddTodoUI)<TodoModel>();

export const removeTodoAPI = createAction(
  TodoActionTypes.RemoveTodoAPI
)<RemoveTodo>();

export const removeTodoUI = createAction(
  TodoActionTypes.RemoveTodoUI
)<RemoveTodo>();

export const completedTodoAPI = createAction(
  TodoActionTypes.CompletedTodoAPI
)<CompletedTodo>();

export const completedTodoUI = createAction(
  TodoActionTypes.CompletedTodoUI
)<TodoModel>();
