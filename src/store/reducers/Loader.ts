import { ActionType, createReducer } from "typesafe-actions";
import { loadingEnd, loadingStart } from "store/actions/Loader";

type ActionLoading = ActionType<typeof loadingStart | typeof loadingEnd>;

type LoadingState = boolean;

export const loadingReducers = createReducer<LoadingState, ActionLoading>(false)
  .handleAction(loadingStart, (state, action) => action.payload.isLoading)
  .handleAction(loadingEnd, (state, action) => action.payload.isLoading);
