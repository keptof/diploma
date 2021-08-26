import { all, fork } from "redux-saga/effects";
import { todosSagaWatcher } from "./Todo";
import { userSagaWatcher } from "./user";

export function* mainSaga() {
  yield all([fork(todosSagaWatcher), fork(userSagaWatcher)]);
}
