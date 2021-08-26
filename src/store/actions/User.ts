import { createAction } from "typesafe-actions";
import { UserModel } from "models/userModel";

enum UserActionTypes {
  LoginUserAPI = "loginUserAPI",
  RegistrationUserAPI = "RegistrationUser",
  LogOutUser = "logOutUser",
  IsAuthorizationUser = "isAuthorizationUser",
  IsNotAuthorizationUser = "IsNotAuthorizationUser",
}

interface IIsAuthorizationUser {
  isAuthorization: boolean;
}

interface IIsNotAuthorizationUser {
  isNotAuthorization: boolean;
}

export const isAuthorizationUser = createAction(
  UserActionTypes.IsAuthorizationUser
)<IIsAuthorizationUser>();

export const isNotAuthorizationUser = createAction(
  UserActionTypes.IsNotAuthorizationUser
)<IIsNotAuthorizationUser>();

export const loginUserAPI = createAction(
  UserActionTypes.LoginUserAPI
)<UserModel>();

export const registrationUserAPI = createAction(
  UserActionTypes.RegistrationUserAPI
)<UserModel>();

export const logOutUser = createAction(UserActionTypes.LogOutUser)();
