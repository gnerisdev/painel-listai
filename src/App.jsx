import { useLocation } from 'react-router-dom';
import { UsersProvider } from 'contexts/Users';
import { AdminProvider } from 'contexts/Admin';
import { AdminRoutes } from 'routes/admin';
import { UsersRoutes } from 'routes/users';

const AdminRoutesProvider = () => {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  );
};

const UsersRoutesProvider = () => {
  return (
    <UsersProvider>
      <UsersRoutes />
    </UsersProvider>
  );
};

const App = () => {
  const location = useLocation();
  const isUsers = location.pathname.startsWith('/users');
  const isAdmin = location.pathname.startsWith('/admin');

  if (isUsers) return <UsersRoutesProvider />
  if (isAdmin) return <AdminRoutesProvider />;

  return <div>Página não encontrada</div>;
};

export default App;
