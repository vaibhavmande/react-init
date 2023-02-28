import React, { useEffect } from 'react';
import { redirect } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import getUserInfo, { UserInfoDetails } from '@/auth/getUserInfo';

interface AuthContextType {
  userInfo: UserInfoDetails | null;
  getUserInfo: () => Promise<UserInfoDetails>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);
AuthContext.displayName = 'AuthContext';

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = React.useState<UserInfoDetails | null>(null);
  const [initialLoad, setInitialLoad] = React.useState(true);

  const handleError = useErrorHandler();

  useEffect(() => {
    getUserInfo()
      .then((userInfo) => {
        setUserInfo(userInfo);
        setInitialLoad(false);
      })
      .catch((error) => handleError(error));
  }, []);

  function logout() {
    setUserInfo(null);
    redirect('/logout');
  }

  const authValues = React.useMemo(
    () => ({
      userInfo,
      getUserInfo,
      logout,
    }),
    [userInfo]
  );

  return (
    <AuthContext.Provider value={authValues}>{!initialLoad ? children : null}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within AuthProvider`);
  }

  return context;
}

export { useAuth };
export default AuthProvider;
