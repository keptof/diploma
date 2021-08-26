import { post } from "./backendTodo";
import { out } from "./backendUser";
import { UserModel } from "models/userModel";
const URL = process.env.REACT_APP_URL!;

export const loginUser = (data: UserModel) =>
  post(`${URL}/users/login`, JSON.stringify(data));

export const registerUser = (data: UserModel) =>
  post(`${URL}/users/register`, JSON.stringify(data));

export const logOutUser = () => out(`${URL}/users/logout`);
