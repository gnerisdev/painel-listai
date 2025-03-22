import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import { HostsContext } from 'contexts/Hosts';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Drawer from 'components/Drawer';
import BackdropLoading from 'components/BackdropLoading';

const menuItems = [
  {
    category: 'Navegação',
    items: [
      {
        text: 'Início',
        link: '/hosts/',
        Icon: () => <i className="fas fa-home"></i>,
      }
    ]
  },

  {
    category: 'Gerenciar Agenda e Solicitações',
    items: [
      {
        text: 'Agenda',
        link: '/hosts/agenda',
        Icon: () => <i className="fas fa-calendar-alt"></i>,
      },
      {
        text: 'Solicitações de Serviço',
        link: '/hosts/solicitacoes',
        Icon: () => <i className="fas fa-bell"></i>,
      },
    ],
  },

  {
    category: 'Financeiro',
    items: [
      {
        text: 'Meus Ganhos',
        link: '/hosts/ganhos',
        Icon: () => <i className="fas fa-wallet"></i>,
      },
      {
        text: 'Pagamentos',
        link: '/hosts/pagamentos',
        Icon: () => <i className="fas fa-credit-card"></i>,
      },
    ],
  },

  {
    category: 'Comunicação e Perfil',
    items: [
      {
        text: 'Chat com Clientes',
        link: '/hosts/chat',
        Icon: () => <i className="fas fa-comments"></i>,
      },
      {
        text: 'Avaliações',
        link: '/hosts/avaliacoes',
        Icon: () => <i className="fas fa-star"></i>,
      },
      {
        text: 'Meu Perfil',
        link: '/hosts/profile',
        Icon: () => <i className="fas fa-user"></i>,
      },
    ],
  }
];


const Admin = (props) => {
  const { loading, provider } = useContext(HostsContext);

  return (
    <>
      <Box sx={{ display: 'flex', maxWidth: '1300px', margin: 'auto' }}>
        <Drawer menuItems={menuItems} name={provider.name} />
        <Box component="main" id="app-main" sx={{ flexGrow: 1, p: 2, mt: '64px', position: 'relative' }}>
          <Box
            component={props.component}
            onSubmit={props.handleSubmit}
            autoComplete="off"
          >
            <Outlet />
          </Box>
          <Box sx={{ display: 'grid', gap: 1 }}>{props.children}</Box>
        </Box>
      </Box>

      <BackdropLoading loading={loading} />
    </>
  );
};

export default Admin;
