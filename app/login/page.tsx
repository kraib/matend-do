export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Login - Matendo Vitals Tracker',
  description: 'Sign in to monitor your health vitals',
};

import LoginForm from './LoginForm';

export default function LoginPage() {
  return <LoginForm />;
}