import { useContext } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import HostsAuth from 'routes/hosts/auth';
import HostsMain from 'routes/hosts/main';
import BackdropLoading from 'components/BackdropLoading';
import { HostsProvider, HostsContext } from 'contexts/Hosts';

const HostsRoutes = {
  Auth: () => (<>{useRoutes([...HostsAuth])}</>), 
  Main: () => (<>{useRoutes([...HostsMain])}</>),
}

const Routes = ({ module }) => {
  const hostContext = useContext(HostsContext);
  const authState = hostContext.authState;

  if (module === 'hosts') {
    return (
      <>
        {authState === 'checking' && <BackdropLoading loading="Carregando" bgColor="#282a37" />}
        {authState === 'authenticated' ? <HostsRoutes.Main /> : <HostsRoutes.Auth />}
      </>
    );
  }

  return <div>Página não encontrada</div>; 
};

const App = () => {
  const location = useLocation();
  const isHosts = location.pathname.startsWith('/hosts');

  return (
    <>
      {isHosts && (
        <HostsProvider>
          <Routes module="hosts" />
        </HostsProvider>
      )}
    </>
  );
};

export default App;
