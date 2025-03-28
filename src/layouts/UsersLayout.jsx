import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UsersContext } from 'contexts/Users';


const Admin = (props) => {
  const { loading } = useContext(UsersContext);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Admin;
