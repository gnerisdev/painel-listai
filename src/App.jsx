import { useContext } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import UsersAuth from 'routes/users/auth';
import UsersMain from 'routes/users/main';
import { UsersProvider, UsersContext } from 'contexts/Users';

const UsersRoutes = {
  Auth: () => (<>{useRoutes([...UsersAuth])}</>), 
  Main: () => (<>{useRoutes([...UsersMain])}</>),
}

const Routes = ({ module }) => {
  const hostContext = useContext(UsersContext);
  // const authState = hostContext.authState;
  const authState = 'authenticated';

  if (module === 'users') {
    return (
      <>
        {authState === 'checking' && 'Carregando...'}
        {authState === 'authenticated' ? <UsersRoutes.Main /> : <UsersRoutes.Auth />}
      </>
    );
  }

  return <div>Página não encontrada</div>; 
};

const App = () => {
  const location = useLocation();
  const isUsers = location.pathname.startsWith('/users');

  return (
    <>
      {isUsers && (
        <UsersProvider>
          <Routes module="users" />
        </UsersProvider>
      )}
    </>
  );
};

export default App;
