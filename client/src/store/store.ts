import { configureStore } from '@reduxjs/toolkit';
import { financeReducer } from './finance/slice';
import { checkLogin, userReducer } from './user/slice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    finance: financeReducer,
    user: userReducer,
  },
});

store.dispatch(checkLogin());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
