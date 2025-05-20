import {
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { fetchUserSignup } from '../store/user/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { routes } from '../routes';
import { useEffect } from 'react';

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loadingAuth, authInfo } = useAppSelector((state) => state.user);

  const handleNavigate = () => {
    navigate(routes.login);
  };
  useEffect(() => {
    if (authInfo) {
      navigate(routes.main);
    }
  }, [authInfo, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      await dispatch(fetchUserSignup({ email, password, name })).unwrap();
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Почта'
        type='email'
        name='email'
        fullWidth
        margin='normal'
        required
      />

      <TextField
        label='Логин'
        type='text'
        name='name'
        fullWidth
        margin='normal'
        required
      />

      <TextField
        label='Пароль'
        type='password'
        name='password'
        fullWidth
        margin='normal'
        required
      />

      <Typography variant='subtitle1' align='center'>
        Введите логин, пароль и почту.
        <br />
        Если у вас есть аккаунта нажмите{' '}
        <Link onClick={handleNavigate} sx={{ cursor: 'pointer' }}>
          сюда.
        </Link>
      </Typography>

      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        disabled={loadingAuth}
        sx={{ mt: 3, mb: 2 }}
      >
        {loadingAuth ? (
          <CircularProgress size={24} color='inherit' />
        ) : (
          'Зарегестрироваться'
        )}
      </Button>
    </form>
  );
};
