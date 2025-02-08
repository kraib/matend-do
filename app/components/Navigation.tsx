'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navigation() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (!session) return null;

  return (
    <nav className="bg-blue-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-white">Matendo Vitals Tracker</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white">
              {session.user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
