import { Navigate } from 'react-router-dom';
import Login from 'pages/users/Login';
import Register from 'pages/users/Register';

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

export default authRoutes; 