import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store/store';
import { ErrorAuth } from '../components/ErrorAuth';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const { errorAuth, errorAuthMessage } = useAppSelector((state) => state.user);

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant='h3' component='h1' align='center' gutterBottom>
          FINANCE
        </Typography>
        <Typography variant='h6' component='h2' align='center' gutterBottom>
          Авторизация
        </Typography>

        <ErrorAuth errorAuth={errorAuth} errorAuthMessage={errorAuthMessage} />

        <LoginForm />
      </Paper>
    </Container>
  );
};
