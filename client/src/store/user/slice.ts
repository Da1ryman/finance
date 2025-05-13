import { createSlice } from '@reduxjs/toolkit';
import { userInitialState } from './initialState';
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

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
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
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + state.authInfo.token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, pending)
      .addCase(fetchUserLogin.rejected, (state, action) => {
        rejected(state);
        state.errorAuthMessage = action.error.message;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        fulfilled(state);
        state.authInfo = action.payload;
        if (state.authInfo.token) {
          localStorage.setItem('token', state.authInfo.token);
          localStorage.setItem('id', state.authInfo.id);
          localStorage.setItem('name', state.authInfo.name);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + state.authInfo.token;
        }
      });

    builder
      .addCase(fetchUserSignup.pending, pending)
      .addCase(fetchUserSignup.rejected, (state, action) => {
        rejected(state);
        state.errorAuthMessage = action.error.message;
      })
      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        fulfilled(state);
        state.authInfo = action.payload;
        if (state.authInfo.token) {
          localStorage.setItem('token', state.authInfo.token);
          localStorage.setItem('id', state.authInfo.id);
          localStorage.setItem('name', state.authInfo.name);
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + state.authInfo.token;
        }
      });
  },
});

export const { logout, checkLogin } = userSlice.actions;
export const userReducer = userSlice.reducer;
