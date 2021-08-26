import { createAction } from "typesafe-actions";

enum ErrorService {
  EmailError = "emailError",
  PasswordError = "passwordError",
  RestError = "restError",
}

interface Error {
  emailError?: string;
  passwordError?: string;
  restError?: string;
}

export const emailError = createAction(ErrorService.EmailError)<Error>();

export const passwordError = createAction(ErrorService.PasswordError)<Error>();

export const restError = createAction(ErrorService.RestError)<Error>();
