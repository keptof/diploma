import { errorReducers, StateError } from "../Error";
import { emailError, passwordError, restError } from "store/actions/Error";

describe("errorReducers()", () => {
  const initialErrorState: StateError = {};

  it("should return empty state", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      emailError({ emailError: "" })
    );

    expect(updateErrorState).toEqual({ emailError: "" });
  });

  it("should return empty state", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      passwordError({ passwordError: "" })
    );

    expect(updateErrorState).toEqual({ passwordError: "" });
  });

  it("should return empty state", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      restError({ restError: "" })
    );

    expect(updateErrorState).toEqual({ restError: "" });
  });

  it("should return an email error text", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      emailError({ emailError: "email error" })
    );

    expect(updateErrorState).toEqual({ emailError: "email error" });
  });

  it("should return an password error text", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      passwordError({ passwordError: "password error" })
    );

    expect(updateErrorState).toEqual({ passwordError: "password error" });
  });

  it("should return an rest error text", () => {
    const updateErrorState = errorReducers(
      initialErrorState,
      restError({ restError: "rest error" })
    );

    expect(updateErrorState).toEqual({ restError: "rest error" });
  });
});
