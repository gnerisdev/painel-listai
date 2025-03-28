import { Navigate } from 'react-router-dom';
import UsersLayout from 'layouts/UsersLayout';
import Home from 'pages/users/Home';
import Custom from 'pages/users/Custom';

const mainRoutes = [
  {
    path: 'users/',
    element: <UsersLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },    
      { path: 'custom', element: <Custom /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default mainRoutes;
