import { Outlet } from 'react-router-dom';
import HeaderAdmin from 'components/HeaderAdmin';

const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
