import { Navigate } from 'react-router-dom';
import Login from 'pages/hosts/Login';
import Register from 'pages/hosts/Register';
import Terms from 'pages/hosts/Terms';

const authRoutes = [
  {
    path: 'hosts/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'terms', element: <Terms /> }
    ],
  },
  // { path: '*', element: <Navigate to="/login" /> },
];

export default authRoutes; 