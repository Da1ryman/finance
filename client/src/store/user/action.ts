import { createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginUserData, SignupUserData } from '../../types/auth';
import { loginUser, signupUser } from '../../api/FinanceApi';
import { errorHandling } from '../../helpers/errorHandling';

export const fetchUserLogin = createAsyncThunk(
  'user/fetchUserLogin',
  async (loginData: LoginUserData) => {
    try {
      const userLogin = await loginUser(loginData);

      return userLogin;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);

export const fetchUserSignup = createAsyncThunk(
  'user/fetchUserSignup',
  async (signupData: SignupUserData) => {
    try {
      const { email } = await signupUser(signupData);
      const userLogin = await loginUser({
        email,
        password: signupData.password,
      });

      return userLogin;
    } catch (error) {
      throw errorHandling(error);
    }
  },
);
