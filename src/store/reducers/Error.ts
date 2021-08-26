import { ActionType, createReducer } from "typesafe-actions";
import { emailError, passwordError, restError } from "store/actions/Error";

type ActionError = ActionType<
  typeof emailError | typeof passwordError | typeof restError
>;

export interface StateError {
  emailError?: string;
  passwordError?: string;
  restError?: string;
}

export type ErrorState = StateError;

export const errorReducers = createReducer<ErrorState, ActionError>({})
  .handleAction(emailError, (state, action) => action.payload)
  .handleAction(passwordError, (state, action) => action.payload)
  .handleAction(restError, (state, action) => action.payload);
