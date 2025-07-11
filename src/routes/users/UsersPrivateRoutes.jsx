import { Navigate, useRoutes } from 'react-router-dom';
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
import UsersLayout from 'layouts/UsersLayout';
export const UsersPrivateRoutes = () => {
  const privateRoutes = [
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

  return useRoutes(privateRoutes);
};
