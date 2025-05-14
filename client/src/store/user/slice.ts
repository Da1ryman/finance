import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { fetchUserLogin, fetchUserSignup } from './action';
import type { UserState } from '../../types/auth';
import axios from 'axios';

const pending = (state: UserState) => {
  state.loadingAuth = true;
  state.errorAuth = false;
};

const fulfilled = (state: UserState) => {
  state.errorAuth = false;
  state.loadingAuth = false;
};

const rejected = (state: UserState) => {
  state.loadingAuth = false;
  state.errorAuth = true;
};

const setingAxiosAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const userLogin = (token?: string, id?: string, name?: string) => {
  if (token && id && name) {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    setingAxiosAuthToken(token);
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.authInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('name');
    },
    checkLogin(state) {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('name');
      const id = localStorage.getItem('id');

      if (id && name && token) {
        state.authInfo = { token, id, name };
        setingAxiosAuthToken(token);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, pending)
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.errorAuthMessage = action.error.message;

        rejected(state);
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.authInfo = action.payload;

        fulfilled(state);
        userLogin(state.authInfo.token, state.authInfo.id, state.authInfo.name);
      });

    builder
      .addCase(fetchUserSignup.pending, pending)
      .addCase(fetchUserSignup.rejected, (state, action) => {
        state.errorAuthMessage = action.error.message;

        rejected(state);
      })
      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        state.authInfo = action.payload;

        fulfilled(state);
        userLogin(state.authInfo.token, state.authInfo.id, state.authInfo.name);
      });
  },
});

export const { logout, checkLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
