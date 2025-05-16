import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { useEffect } from 'react';
import { checkLogin } from '../store/user/slice';

export const PrivateRoute = () => {
  const auth = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return auth ? <Outlet /> : <Navigate to='/login' />;
};
