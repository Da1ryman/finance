import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect } from 'react';
import { checkLogin } from '../store/user/slice';

export const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.user.authInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return auth ? <Outlet /> : <Navigate to='/login' />;
};
