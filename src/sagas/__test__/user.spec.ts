import { call, put } from "redux-saga/effects";
import { logOutUserWorker, userLoginWorker, userRegisterWorker } from "../user";
import { loadingEnd, loadingStart } from "store/actions/Loader";
import { emailError, passwordError, restError } from "store/actions/Error";
import { UserModelFromServer } from "models/userModel";
import { loginUser, registerUser, logOutUser } from "services/user";
import {
  isAuthorizationUser,
  isNotAuthorizationUser,
} from "store/actions/User";

describe("user saga()", () => {
  const dataUser = {
    name: "alex",
    email: "1234@gmail.com",
    password: "1234",
  };

  const userFromServ: UserModelFromServer = {
    token: "12213231",
    user: dataUser,
  };

  describe("userLoginWorker", () => {
    const generator = userLoginWorker({ payload: dataUser });

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should call a server request for login", () => {
      const payload = dataUser;
      const result = generator.next().value;
      expect(result).toEqual(call(loginUser, payload));
    });

    it("should put, boolean in action isAuthorizationUser", () => {
      const result = generator.next(userFromServ).value;
      expect(result).toEqual(
        put(isAuthorizationUser({ isAuthorization: true }))
      );
    });

    it(
      "should must dispatch the loading " +
        "action finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an email error", () => {
      generator.next().value;
      const error = "error email";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(emailError({ emailError: error })));
    });

    it("should return an password error", () => {
      generator.next().value;
      const error = "password error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(passwordError({ passwordError: error })));
    });

    it("should return an restError error", () => {
      generator.next().value;
      const error = "restError error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });

  describe("userRegisterWorker", () => {
    const generator = userRegisterWorker({ payload: dataUser });

    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should call a server request for login", () => {
      const payload = dataUser;
      const result = generator.next().value;
      expect(result).toEqual(call(registerUser, payload));
    });

    it("should put, boolean in action isAuthorizationUser", () => {
      const result = generator.next(userFromServ).value;
      expect(result).toEqual(
        put(isAuthorizationUser({ isAuthorization: true }))
      );
    });

    it(
      "should must dispatch the loading action" +
        " finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an email error", () => {
      generator.next().value;
      const error = "error email";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(emailError({ emailError: error })));
    });

    it("should return an password error", () => {
      generator.next().value;
      const error = "password error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(passwordError({ passwordError: error })));
    });

    it("should return an restError error", () => {
      generator.next().value;
      const error = "restError error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });

  describe("logOutUserWorker()", () => {
    const generator = logOutUserWorker();
    it("must dispatch the loading action start with the value true", () => {
      const result = generator.next().value;
      expect(result).toEqual(put(loadingStart({ isLoading: true })));
    });

    it("should call logoutUserService", () => {
      const result = generator.next().value;
      expect(result).toEqual(call(logOutUser));
    });

    it("should put isNotAuthorizationUser with boolean", () => {
      const result = generator.next().value;
      expect(result).toEqual(
        put(isNotAuthorizationUser({ isNotAuthorization: true }))
      );
    });

    it(
      "should must dispatch the loading action " +
        "finish with the value false",
      () => {
        const result = generator.next().value;
        expect(result).toEqual(put(loadingEnd({ isLoading: false })));
      }
    );

    it("should return an error", () => {
      generator.next().value;
      const error = "error";
      const result = generator.throw(error).value;
      expect(result).toEqual(put(restError({ restError: error })));
    });
  });
});
