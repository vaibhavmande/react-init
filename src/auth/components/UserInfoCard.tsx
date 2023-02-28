import React from 'react';

import { UserInfoDetails } from '@/auth/getUserInfo';

function UserInfoCard({ userInfo }: { userInfo: UserInfoDetails }) {
  const { username, email } = userInfo;
  return (
    <ul style={{ display: 'grid', gap: '0.4rem' }}>
      <li>
        <p>Username: {username}</p>
      </li>
      <li>Email: {email}</li>
    </ul>
  );
}

export default UserInfoCard;
