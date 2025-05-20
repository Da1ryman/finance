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
import { customRoutes } from '../routes';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const handleNavigate = useNavigate();

  const loadingAuth = useAppSelector((state) => state.user.loadingAuth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    await dispatch(fetchUserLogin({ email, password }));
    handleNavigate('/');
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
        label='Пароль'
        type='password'
        name='password'
        fullWidth
        margin='normal'
        required
      />

      <Typography variant='subtitle1' align='center'>
        Введите пароль и почту.
        <br />
        Если у вас нет аккаунта нажмите{' '}
        <Link
          onClick={() => handleNavigate(customRoutes.signup)}
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
