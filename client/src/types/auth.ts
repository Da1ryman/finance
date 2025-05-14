export type LoginUserData = {
  email: string;
  password: string;
};

export type SignupUserData = {
  email: string;
  name: string;
  password: string;
};

export type User = {
  id?: string;
  name?: string;
  token?: string;
};

export type UserCreated = {
  email: string;
  name: string;
  password: string;
};

export type UserState = {
  errorAuth: boolean;
  loadingAuth: boolean;
  authInfo: User | null;
  errorAuthMessage?: string;
};
