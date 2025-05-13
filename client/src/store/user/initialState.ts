import type { UserState } from '../../types/auth';

export const userInitialState: UserState = {
  loadingAuth: false,
  errorAuth: false,
  authInfo: null,
  errorAuthMessage: '',
};
