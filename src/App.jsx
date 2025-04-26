import { UsersProvider } from 'contexts/Users';
import { AdminProvider } from 'contexts/Admin';
import { AdminRoutes } from 'routes/admin';
import { UsersRoutes } from 'routes/users';
import { GuestsRoutes } from 'routes/guests';
import { GuestsProvider } from 'contexts/Guests';

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

const GuestsRoutesProvider = () => {
  return (
    <GuestsProvider>
      <GuestsRoutes />
    </GuestsProvider>
  );
};

const App = () => {
  const hostname = window.location.hostname;
  const isUsers = hostname.startsWith('users.');
  const isAdmin = hostname.startsWith('admin.');
  const isGuest = hostname.startsWith('sites.');

  if (isAdmin) return <AdminRoutesProvider />;
  if (isUsers) return <UsersRoutesProvider />
  if (isGuest) return <GuestsRoutesProvider />;

  return <div>Página não encontrada</div>;
};

export default App;
