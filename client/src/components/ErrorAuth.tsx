import { Alert } from '@mui/material';

export const ErrorAuth = ({
  errorAuth,
  errorAuthMessage,
}: {
  errorAuth: boolean;
  errorAuthMessage?: string;
}) =>
  errorAuth && (
    <Alert severity='error' sx={{ mb: 2 }}>
      {errorAuthMessage}
    </Alert>
  );
