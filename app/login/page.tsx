import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Login - Matendo Vitals Tracker',
  description: 'Sign in to monitor your health vitals',
};

export default async function LoginPage() {
  const session = await getServerSession();
  
  // Only redirect if we're on the login page and have a session
  if (session?.user) {
    redirect('/');
  }

  return <LoginForm />;
}