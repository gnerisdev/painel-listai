import { AdminProvider } from 'contexts/Admin';
import { AdminRoutes } from 'routes/admin';
import { GuestsRoutes } from 'routes/guests';
import { GuestsProvider } from 'contexts/Guests';
import ScrollToTop from 'pages/admin/ScrollToTop';
import { UsersRouter } from 'routes/users';

const AdminRoutesProvider = () => {
  return (
    <AdminProvider>
      <ScrollToTop />
      <AdminRoutes />
    </AdminProvider>
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
  const isGuest = hostname.startsWith('site.');

  if (isAdmin) return <AdminRoutesProvider />;
  if (isUsers) return <UsersRouter />
  if (isGuest) return <GuestsRoutesProvider />;
};

export default App;
