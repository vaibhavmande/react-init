import React from 'react';
import { useAuth } from '@/auth/AuthContext';

function ProfilePage() {
  const { userInfo } = useAuth();
  return <pre>{JSON.stringify(userInfo, null, '\t')}</pre>;
}

export default ProfilePage;
