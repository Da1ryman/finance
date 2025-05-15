import {
  Button,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { fetchUserLogin } from '../store/user/action';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useState } from 'react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const handleNavigate = useNavigate();

  const { loadingAuth } = useAppSelector((state) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(fetchUserLogin({ email, password }));
    handleNavigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Почта'
        type='email'
        fullWidth
        margin='normal'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label='Пароль'
        type='password'
        fullWidth
        margin='normal'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Typography variant='subtitle1' align='center'>
        Введите пароль и почту.
        <br />
        Если у вас нет аккаунта нажмите{' '}
        <Link
          onClick={() => handleNavigate('/signup')}
          sx={{ cursor: 'pointer' }}
        >
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
        {loadingAuth ? <CircularProgress size={24} color='inherit' /> : 'Войти'}
      </Button>
    </form>
  );
};
