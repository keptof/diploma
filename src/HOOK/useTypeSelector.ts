import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootReducer } from "store/store";

export const useTypeSelector: TypedUseSelectorHook<RootReducer> = useSelector;
