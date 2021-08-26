import { ActionType, createReducer } from "typesafe-actions";
import { TodoModel } from "models/todoModel";
import {
  setTodo,
  addTodoUI,
  removeTodoUI,
  completedTodoUI,
} from "store/actions/Todo";

type ActionTodo = ActionType<
  | typeof setTodo
  | typeof addTodoUI
  | typeof removeTodoUI
  | typeof completedTodoUI
>;

const initialStateTodo: Array<TodoModel> = [];

export type TodoState = TodoModel[];

export const todoReducers = createReducer<TodoState, ActionTodo>(
  initialStateTodo
)
  .handleAction(setTodo, (state, action) => [...action.payload])
  .handleAction(addTodoUI, (state, action) => [action.payload, ...state])
  .handleAction(removeTodoUI, (state, action) =>
    state.filter(({ id }) => id !== action.payload.id)
  )
  .handleAction(completedTodoUI, (state, action) =>
    state.map((todo) => {
      if (todo.id === action.payload.id) {
        todo.completed = action.payload.completed;
      }

      return todo;
    })
  );
