import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import AdminLayout from 'layouts/AdminLayout';
import ManageUsers from 'pages/admin/ManageUsers';
import Home from 'pages/admin/Home';

const authRoutes = [
  {
    path: 'admin/',
    children: [
      { path: 'login', element:<>login</> },
      { path: '', element:<>ok</> },
    ],
  },
  { path: '*', element: <Navigate to="admin/login" /> },
];

const mainRoutes = [
  {
    path: 'admin/',
    element: <AdminLayout />,
    children: [
      { path: 'users', element: <ManageUsers /> },
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: '*', element: <Navigate to="home/" /> },
    ],
  },
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const AdminRoutes = () => {
  // const { authState } = useContext(AdminContext);
  const authState = 'authenticated';
  return (
    <>
      {authState === 'checking' && 'Carregando...'}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};