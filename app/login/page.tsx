'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      window.location.href = '/';
    }
  }, [status]);

  return <LoginForm />;
}