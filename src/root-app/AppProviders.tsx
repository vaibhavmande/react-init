import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '@/auth/AuthContext';

function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  );
}

export default AppProviders;
