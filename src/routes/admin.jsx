import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import AdminLayout from 'layouts/AdminLayout';
import ManageUsers from 'pages/admin/ManageUsers';
import Home from 'pages/admin/Home';
import Events from 'pages/admin/Events';
import EventUpdate from 'pages/admin/EventUpdate';
import Login from 'pages/admin/Login';
import Services from 'pages/admin/Services';
import Gifts from 'pages/admin/Gifts';
import GiftAdd from 'pages/admin/GiftAdd';
import LoadingLogo from 'components/LoadingLogo';
import EventTypes from 'pages/admin/EventTypes';
import ServiceAdd from 'pages/admin/ServiceAdd';
import EventMessages from 'pages/admin/EventMessages';
import EventGuestConfirmations from 'pages/admin/EventGuestConfirmations';
import EventGiftsReceived from 'pages/admin/EventGiftsReceived';
import Payouts from 'pages/admin/Payouts';
import EventServices from 'pages/admin/EventServices';
import Settings from 'pages/admin/Settings';
import Transactions from 'pages/admin/Transactions';
import GiftSuggestions from 'pages/admin/GiftSuggestions';

const authRoutes = [
  {
    path: '/',
    children: [
      { path: 'login', element: <Login /> },
      { path: '', element: <Navigate to="login" /> },
    ],
  },
  { path: '*', element: <Navigate to="/login" /> },
];

const mainRoutes = [
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'users', element: <ManageUsers /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventUpdate /> },
      { path: 'events/:id/messages', element: <EventMessages /> },
      { path: 'events/:id/guests', element: <EventGuestConfirmations /> },
      { path: 'events/:id/gifts-received', element: <EventGiftsReceived /> },
      { path: 'events/:id/services', element: <EventServices /> },      
      { path: 'services', element: <Services /> },
      { path: 'services/:id', element: <ServiceAdd title="Atualizar Serviço" /> },
      { path: 'services/add', element: <ServiceAdd title="Novo Serviço" /> },
      { path: 'gifts', element: <Gifts /> },
      { path: 'gifts/:id', element: <GiftAdd title="Atualizar Presente" /> },
      { path: 'gifts/create', element: <GiftAdd title="Novo Presente" /> },
      { path: 'gift-suggestions', element: <GiftSuggestions /> },
      { path: 'event-types', element: <EventTypes /> },
      { path: 'payouts', element: <Payouts /> },
      { path: 'transactions', element: <Transactions /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '*', element: <Navigate to="/" /> }
];

const Auth = () => useRoutes([...authRoutes]);
const Main = () => useRoutes([...mainRoutes]);

export const AdminRoutes = () => {
  const { authState } = useContext(AdminContext);

  return (
    <>
      {authState === 'checking' && <LoadingLogo />}
      {authState === 'authenticated' && <Main />}
      {authState === 'unauthorized' && <Auth />}
    </>
  );
};