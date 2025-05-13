export interface LoginUserData {
  email: string;
  password: string;
}

export interface SignupUserData {
  email: string;
  name: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  token: string;
}

export interface UserCreated {
  email: string;
  name: string;
  password: string;
}

export interface UserState {
  errorAuth: boolean;
  loadingAuth: boolean;
  authInfo: User | null;
  errorAuthMessage?: string;
}
