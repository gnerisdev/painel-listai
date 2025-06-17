import { useRoutes } from 'react-router-dom';
import Home from 'pages/guests/Home';
import GuestsLayout from 'layouts/GuestsLayout';
import CheckoutSuccess from 'pages/guests/CheckoutSuccess';

const mainRoutes = [
  {
    path: '/',
    element: <GuestsLayout />,
    children: [
      { path: 'page/checkout-success', element: <CheckoutSuccess /> },
      { path: ':slug/*', element: <Home /> },
      { path: '', element: <Home /> },
    ],
  },
];

const Main = () => useRoutes([...mainRoutes]);

export const GuestsRoutes = () => <Main />;