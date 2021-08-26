export interface UserModel {
  password: string;
  email: string;
  name?: string;
}

export interface UserModelFromServer {
  token: string;
  user: UserModel;
}
