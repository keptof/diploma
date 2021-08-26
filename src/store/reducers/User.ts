import { ActionType, createReducer } from "typesafe-actions";
import {
  isAuthorizationUser,
  isNotAuthorizationUser,
} from "store/actions/User";

type ActionUser = ActionType<
  typeof isAuthorizationUser | typeof isNotAuthorizationUser
>;

type userAuthorizationState = boolean;
type userNotAuthorizationState = boolean;

export const isAuthorizationUserReducer = createReducer<
  userAuthorizationState,
  ActionUser
>(false).handleAction(
  isAuthorizationUser,
  (state, action) => action.payload.isAuthorization
);

export const isNotAuthorizationUserReducer = createReducer<
  userNotAuthorizationState,
  ActionUser
>(false).handleAction(
  isNotAuthorizationUser,
  (state, action) => action.payload.isNotAuthorization
);
