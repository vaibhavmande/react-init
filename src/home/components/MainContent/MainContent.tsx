import React from 'react';

import { useAuth } from '@/auth/AuthContext';
import UserInfoCard from '@/auth/components/UserInfoCard';
import AppInfoCard from '@/home/components/AppInfoCard/AppInfoCard';

function MainContent() {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <p>Not Authenticated</p>;
  }

  const { username } = userInfo;
  return (
    <>
      <p>Welcome, {username}</p>
      <AppInfoCard />
      <UserInfoCard userInfo={userInfo} />
    </>
  );
}

export default MainContent;
