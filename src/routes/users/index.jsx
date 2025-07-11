import { useContext } from 'react';
import { GlobalProvider } from 'contexts/Global';
import { UsersProvider, UsersContext } from 'contexts/Users';
import { UsersPublicRoutes } from './UsersPublicRoutes';
import { UsersPrivateRoutes } from './UsersPrivateRoutes';
import ScrollToTop from 'pages/admin/ScrollToTop';
import LoadingLogo from 'components/LoadingLogo';

const UsersRoutesPrivateWrapper = () => {
  const { authState } = useContext(UsersContext);

  if (authState === 'checking') return <LoadingLogo />;
  if (authState === 'authenticated') return <UsersPrivateRoutes />;

  return <UsersPublicRoutes />;
};

export const UsersRouter = () => {
  const authState = localStorage.getItem('userToken') ? 'authenticated' : 'unauthorized';

  return (
    <GlobalProvider>
      <ScrollToTop />
      {authState === 'authenticated' ? (
        <UsersProvider>
          <UsersRoutesPrivateWrapper />
        </UsersProvider>
      ) : (
        <UsersPublicRoutes />
      )}
    </GlobalProvider>
  );
};
