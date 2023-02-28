import React from 'react';

import { Route, Routes } from 'react-router-dom';
import HomePage from '@/home/components/HomePage/HomePage';
import LoginPage from '@/login-page/components/LoginPage/LoginPage';
import ProfilePage from '@/profile/components/ProfilePage/ProfilePage';

function AuthenticatedAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/logout" element={<p>Logout page</p>} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}

function UnauthenticatedAppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<LoginPage />} />
      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
  );
}

export { AuthenticatedAppRoutes, UnauthenticatedAppRoutes };
