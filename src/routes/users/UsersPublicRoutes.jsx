import { Navigate, useRoutes } from 'react-router-dom';
import Login from 'pages/users/Login';
import Register from 'pages/users/Register';
import PainelPreRegister from 'pages/users/PainelPreRegister';

export const UsersPublicRoutes = () => {
  const publicRoutes = [
    {
      path: '/',
      children: [
        { path: 'login', element: <Login /> },
        { path: '', element: <Navigate to="login" /> },
        { path: 'register', element: <Register /> },
        { path: 'pre-register', element: <PainelPreRegister /> },
      ],
    },
    { path: '*', element: <Navigate to="/login" /> },
  ];
  
  return useRoutes(publicRoutes);
};
