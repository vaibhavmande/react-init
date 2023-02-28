import React from 'react';

import { useAuth } from '@/auth/AuthContext';
import './app.css';

const AuthenticatedApp = React.lazy(() => import('@/root-app/AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('@/root-app/UnauthenticatedApp'));

export default function RootApp() {
  const { userInfo } = useAuth();

  return (
    <React.Suspense fallback={<p>Loading....</p>}>
      {userInfo ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}
