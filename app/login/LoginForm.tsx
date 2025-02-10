'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePatient } from '@/context/patient-context';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setPatientName } = usePatient();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (session?.user?.name) {
      setPatientName(session.user.name);
      router.push(callbackUrl);
    }
  }, [session, router, setPatientName, callbackUrl]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Matendo Vitals Tracker
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to monitor your health vitals
          </p>
        </div>
        <div className="mt-8">
          <Button
            onClick={() => signIn('google', { callbackUrl })}
            className="w-full flex items-center justify-center"
            size="lg"
          >
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
