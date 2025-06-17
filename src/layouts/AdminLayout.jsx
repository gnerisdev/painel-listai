import { Outlet } from 'react-router-dom';
import HeaderAdmin from 'components/HeaderAdmin';

document.title = 'Painel Administrativo';

const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
