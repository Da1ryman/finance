import type { UserState } from '../../types/auth';

export const initialState: UserState = {
  loadingAuth: false,
  errorAuth: false,
  authInfo: null,
  errorAuthMessage: '',
};
