import { takeEvery, call, put } from "redux-saga/effects";
import { completedTodo, getTodos, removeTodo, addTodo } from "services/todo";
import {
  fetchTodo,
  setTodo,
  addTodoUI,
  addTodoAPI,
  removeTodoUI,
  removeTodoAPI,
  completedTodoUI,
  completedTodoAPI,
} from "store/actions/Todo";
import { loadingEnd, loadingStart } from "store/actions/Loader";
import { restError } from "store/actions/Error";
import { TodoModel, ITodo } from "models/todoModel";

export function* fetchTodoWorker() {
  try {
    yield put(loadingStart({ isLoading: true }));
    const response: ITodo[] = yield call(getTodos);
    const todos = response.map(
      (todo) =>
        new TodoModel(todo.name, todo.description, todo.completed, todo._id)
    );

    yield put(setTodo(todos));
  } catch (e) {
    yield put(
      restError({
        restError: String(e),
      })
    );
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* addTodoWorker({ payload }: { payload: ITodo }) {
  try {
    yield put(loadingStart({ isLoading: true }));

    const response: ITodo = yield call(addTodo, payload);
    const newTodo = new TodoModel(
      response.name,
      response.description,
      response.completed,
      response._id
    );
    yield put(addTodoUI(newTodo));
  } catch (e) {
    yield put(
      restError({
        restError: String(e),
      })
    );
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* removeTodoWorker({
  payload: { id },
}: {
  payload: { id: string };
}) {
  try {
    yield put(loadingStart({ isLoading: true }));

    yield call(removeTodo, id);

    yield put(removeTodoUI({ id }));
  } catch (e) {
    yield put(
      restError({
        restError: String(e),
      })
    );
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* completeTodoWorker({
  payload: { id, completed },
}: {
  payload: { id: string; completed: boolean };
}) {
  try {
    yield put(loadingStart({ isLoading: true }));

    const response: ITodo = yield call(completedTodo, id, completed);
    const todo = new TodoModel(
      response.name,
      response.description,
      response.completed,
      response._id
    );
    yield put(completedTodoUI(todo));
  } catch (e) {
    yield put(
      restError({
        restError: String(e),
      })
    );
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* todosSagaWatcher() {
  yield takeEvery(fetchTodo, fetchTodoWorker);
  yield takeEvery(addTodoAPI, addTodoWorker);
  yield takeEvery(removeTodoAPI, removeTodoWorker);
  yield takeEvery(completedTodoAPI, completeTodoWorker);
}
