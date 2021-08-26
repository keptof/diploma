import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { mainSaga } from "sagas/mainSaga";
import { todoReducers } from "./reducers/Todos";
import { errorReducers } from "./reducers/Error";
import { loadingReducers } from "./reducers/Loader";
import {
  isAuthorizationUserReducer,
  isNotAuthorizationUserReducer,
} from "./reducers/User";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const rootReducer = combineReducers({
  todos: todoReducers,
  isLoading: loadingReducers,
  error: errorReducers,
  isAuthorizationUser: isAuthorizationUserReducer,
  isNotAuthorizationUser: isNotAuthorizationUserReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mainSaga);
