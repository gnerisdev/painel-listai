import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import AdminLayout from 'layouts/AdminLayout';
import ManageUsers from 'pages/admin/ManageUsers';
import Home from 'pages/admin/Home';
import Events from 'pages/admin/Events';
import EventUpdate from 'pages/admin/EventUpdate';
import Login from 'pages/admin/Login';
import Services from 'pages/admin/Services';
import Gifts from 'pages/admin/Gifts';
import GiftAdd from 'pages/admin/GiftAdd';
import LoadingLogo from 'components/LoadingLogo';
import EventTypes from 'pages/admin/EventTypes';

const authRoutes = [
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Navigate to="login" /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" /> }, 
];

const mainRoutes = [
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users', element: <ManageUsers /> },
      { path: 'events', element: <Events /> },
      { path: 'event/:id', element: <EventUpdate /> },
      { path: 'services', element: <Services /> },
      { path: 'gifts', element: <Gifts /> },      
      { path: 'gifts/create', element: <GiftAdd /> },
      { path: 'event-types', element: <EventTypes /> }      
    ],
  },
  { path: '*', element: <Navigate to="/" /> }
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const AdminRoutes = () => {
  const { authState } = useContext(AdminContext);
  return (
    <>
      {authState === 'checking' && <LoadingLogo />}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};