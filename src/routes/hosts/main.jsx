import { Navigate } from 'react-router-dom';
import ProvidersPanelLayout from 'layouts/ProvidersPanel';
import Home from 'pages/hosts/Home';
import Orders from 'pages/Orders/Index';
import Financial from 'pages/Financial/Index';

const mainRoutes = [
  {
    path: 'hosts/',
    element: <ProvidersPanelLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },    
      { path: 'orders', element: <Orders /> },
      { path: 'financial', element: <Financial /> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default mainRoutes;
