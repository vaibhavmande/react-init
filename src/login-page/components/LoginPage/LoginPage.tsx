import React from 'react';

function LoginPage() {
  return (
    <>
      <h1 style={{ marginBlock: '1rem', fontWeight: 'normal' }}>
        You are not authorized. Please login to continue
      </h1>
      <a href="/.auth/login/aad?post_login_redirect_uri=/home" title="login">
        Login
      </a>
    </>
  );
}

export default LoginPage;
