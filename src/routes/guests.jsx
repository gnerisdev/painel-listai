import { useRoutes } from 'react-router-dom';
import Home from 'pages/guests/Home';

const mainRoutes = [
  {
    path: '/',
    children: [
      { path: '', element: <Home /> },
      { path: ':slug/*', element: <Home /> },
    ],
  },
];

const Main = () => useRoutes([...mainRoutes]);

export const GuestsRoutes = () => <Main />;