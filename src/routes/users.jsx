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
import Confirmations from 'pages/users/Confirmations';
import Messages from 'pages/users/Messages';
import GiftsReceived from 'pages/users/GiftsReceived';
import LoadingLogo from 'components/LoadingLogo';

const authRoutes = [
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Navigate to="login" /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" /> },
];

const mainRoutes = [
  {
    path: '/',
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
      { path: 'confirmations', element: <Confirmations /> },
      { path: 'messages', element: <Messages /> },
      { path: 'gifts-received', element: <GiftsReceived /> },
    ],
  },
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const UsersRoutes = () => {
  const { authState } = useContext(UsersContext);

  return (
    <>
      {authState === 'checking' && <LoadingLogo />}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};
