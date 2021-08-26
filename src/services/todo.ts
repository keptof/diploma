import { get, patch, post, remove } from "./backendTodo";
import { ITodo } from "models/todoModel";
const URL = process.env.REACT_APP_URL!;

export const getTodos = () => get(`${URL}/tasks`);

export const addTodo = (data: ITodo) =>
  post(`${URL}/tasks`, JSON.stringify(data));

export const removeTodo = (id: string) => remove(`${URL}/tasks/${id}`);

export const completedTodo = (id: string, completed: boolean) =>
  patch(`${URL}/tasks/${id}`, JSON.stringify({ completed }));
