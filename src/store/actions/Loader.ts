import { createAction } from "typesafe-actions";

enum LoadingActionTypes {
  LoadingStart = "loadingStart",
  LoadingEnd = "loadingEnd",
}

interface IsLoading {
  isLoading: boolean;
}

export const loadingStart = createAction(
  LoadingActionTypes.LoadingStart
)<IsLoading>();

export const loadingEnd = createAction(
  LoadingActionTypes.LoadingEnd
)<IsLoading>();
