import { UserModel, UserModelFromServer } from "models/userModel";
import { call, put, takeEvery } from "redux-saga/effects";
import { loadingEnd, loadingStart } from "store/actions/Loader";
import {
  loginUserAPI,
  registrationUserAPI,
  logOutUser,
  isAuthorizationUser,
  isNotAuthorizationUser,
} from "store/actions/User";
import { emailError, passwordError, restError } from "store/actions/Error";
import {
  loginUser,
  logOutUser as logoutUserService,
  registerUser,
} from "services/user";

export function* userLoginWorker({ payload }: { payload: UserModel }) {
  try {
    yield put(loadingStart({ isLoading: true }));

    const {
      token,
      user: { name },
    }: UserModelFromServer = yield call(loginUser, payload);
    localStorage.setItem("token", token);
    localStorage.setItem("userName", name!);
    yield put(isAuthorizationUser({ isAuthorization: true }));
  } catch (e) {
    const text = String(e);

    if (text.includes("email")) {
      yield put(
        emailError({
          emailError: text,
        })
      );
    } else if (text.includes("password")) {
      yield put(
        passwordError({
          passwordError: text,
        })
      );
    } else {
      yield put(
        restError({
          restError: text,
        })
      );
    }
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* userRegisterWorker({ payload }: { payload: UserModel }) {
  try {
    yield put(loadingStart({ isLoading: true }));

    const {
      token,
      user: { name },
    }: UserModelFromServer = yield call(registerUser, payload);

    localStorage.setItem("token", token);
    localStorage.setItem("userName", name!);
    yield put(isAuthorizationUser({ isAuthorization: true }));
  } catch (e) {
    const text = String(e);

    if (text.includes("email")) {
      yield put(
        emailError({
          emailError: text,
        })
      );
    } else if (text.includes("password")) {
      yield put(
        passwordError({
          passwordError: text,
        })
      );
    } else {
      yield put(
        restError({
          restError: text,
        })
      );
    }
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* logOutUserWorker() {
  try {
    yield put(loadingStart({ isLoading: true }));

    yield call(logoutUserService);
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    yield put(isNotAuthorizationUser({ isNotAuthorization: true }));
  } catch (e) {
    yield put(
      restError({
        restError: String(e),
      })
    );
  } finally {
    yield put(loadingEnd({ isLoading: false }));
  }
}

export function* userSagaWatcher() {
  yield takeEvery(loginUserAPI, userLoginWorker);
  yield takeEvery(registrationUserAPI, userRegisterWorker);
  yield takeEvery(logOutUser, logOutUserWorker);
}
