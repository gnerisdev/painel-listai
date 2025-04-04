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

const authRoutes = [
  {
    path: 'users/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Login /> },
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
