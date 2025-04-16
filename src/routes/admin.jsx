import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import AdminLayout from 'layouts/AdminLayout';
import ManageUsers from 'pages/admin/ManageUsers';
import Home from 'pages/admin/Home';
import Events from 'pages/admin/Events';
import EventUpdate from 'pages/admin/EventUpdate';
import Login from 'pages/admin/Login';

const authRoutes = [
  {
    path: 'admin/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Navigate to="admin/login" /> },
    ],
  },
  { path: '*', element: <Navigate to="admin/login" /> }, 
];

const mainRoutes = [
  {
    path: 'admin/',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users', element: <ManageUsers /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventUpdate /> },
    ],
  },
  { path: '*', element: <Navigate to="admin/" /> }
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const AdminRoutes = () => {
  const { authState } = useContext(AdminContext);
  return (
    <>
      {authState === 'checking' && 'Carregando...'}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};