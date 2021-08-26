import { loadingReducers } from "../Loader";
import { loadingEnd, loadingStart } from "store/actions/Loader";

describe("loadingReducers()", () => {
  let initialLoadingState: boolean;

  beforeEach(() => {
    initialLoadingState = false;
  });

  it("should return true", () => {
    const updateState = loadingReducers(
      initialLoadingState,
      loadingStart({ isLoading: true })
    );

    expect(updateState).toEqual(true);
  });

  it("should return false", () => {
    const updateState = loadingReducers(
      initialLoadingState,
      loadingEnd({ isLoading: false })
    );

    expect(updateState).toEqual(false);
  });
});
