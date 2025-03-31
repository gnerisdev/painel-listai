import { Navigate } from 'react-router-dom';
import UsersLayout from 'layouts/UsersLayout';
import Home from 'pages/users/Home';
import Custom from 'pages/users/Custom';
import Info from 'pages/users/Info';

const mainRoutes = [
  {
    path: 'users/',
    element: <UsersLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },    
      { path: 'custom', element: <Custom /> },
      { path: 'info', element: <Info /> },
      { path: '*', element: <Navigate to="home/" /> },
    ],
  },
];

export default mainRoutes;
