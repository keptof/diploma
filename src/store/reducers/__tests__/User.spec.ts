import {
  isAuthorizationUserReducer,
  isNotAuthorizationUserReducer,
} from "../User";
import {
  isAuthorizationUser,
  isNotAuthorizationUser,
} from "store/actions/User";

describe("isAuthorizationUserReducer()", () => {
  it("should return true when the user is logged in", () => {
    const result = isAuthorizationUserReducer(
      false,
      isAuthorizationUser({ isAuthorization: true })
    );
    expect(result).toBe(true);
  });

  it("should return false when the user is not logged in", () => {
    const result = isAuthorizationUserReducer(
      false,
      isAuthorizationUser({ isAuthorization: false })
    );
    expect(result).toBe(false);
  });
});

describe("isNotAuthorizationUserReducer()", () => {
  it("should return true when the user is logged in", () => {
    const result = isNotAuthorizationUserReducer(
      false,
      isNotAuthorizationUser({ isNotAuthorization: true })
    );
    expect(result).toBe(true);
  });

  it("should return false when the user is not logged in", () => {
    const result = isNotAuthorizationUserReducer(
      false,
      isNotAuthorizationUser({ isNotAuthorization: false })
    );
    expect(result).toBe(false);
  });
});
