import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { UsersContext } from 'contexts/Users';
import UsersLayout from 'layouts/UsersLayout';
import Login from 'pages/users/Login';
import Register from 'pages/users/Register';
import Home from 'pages/users/Home';
import Custom from 'pages/users/Custom';
import Info from 'pages/users/Info';
import Gifts from 'pages/users/Gifts';
import CustomPages from 'pages/users/CustomPages';
import Settings from 'pages/users/Settings';
import Gallery from 'pages/users/Gallery';
import ServicePackage from 'pages/users/ServicePackage';

const authRoutes = [
  {
    path: 'users/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Navigate to="admin/login" /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '*', element: <Navigate to="users/login" /> },
];

const mainRoutes = [
  {
    path: 'users/',
    element: <UsersLayout />,
    children: [
      { path: '*', element: <Navigate to="home/" /> },
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'custom', element: <Custom /> },
      { path: 'info', element: <Info /> },
      { path: 'gifts', element: <Gifts /> },
      { path: 'custom-pages', element: <CustomPages /> },
      { path: 'settings', element: <Settings /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'service-package', element: <ServicePackage /> },
    ],
  },
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const UsersRoutes = () => {
  const { authState } = useContext(UsersContext);

  return (
    <>
      {authState === 'checking' && 'Carregando...'}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};
