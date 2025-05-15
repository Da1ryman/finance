import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../store/store';
import { ErrorAuth } from '../components/ErrorAuth';
import type { JSX } from 'react';

export const AuthLayout = ({
  children,
  title,
}: {
  children: JSX.Element;
  title: string;
}) => {
  const { errorAuth, errorAuthMessage } = useAppSelector((state) => state.user);

  return (
    <Container maxWidth='xs'>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant='h3' component='h1' align='center' gutterBottom>
          FINANCE
        </Typography>

        <Typography variant='h6' component='h2' align='center' gutterBottom>
          {title}
        </Typography>

        <ErrorAuth errorAuth={errorAuth} errorAuthMessage={errorAuthMessage} />

        {children}
      </Paper>
    </Container>
  );
};
