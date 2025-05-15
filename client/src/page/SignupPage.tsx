import { SignupForm } from '../components/SignupForm';
import { AuthLayout } from '../layout/AuthLayout';

export const SignupPage = () => (
  <AuthLayout title='Регистрация'>
    <SignupForm />
  </AuthLayout>
);
