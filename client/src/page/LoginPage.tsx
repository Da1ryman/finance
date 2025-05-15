import { LoginForm } from '../components/LoginForm';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => (
  <AuthLayout title='Авторизация'>
    <LoginForm />
  </AuthLayout>
);
