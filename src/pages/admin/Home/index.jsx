import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { useAdmin } from 'contexts/Admin';
import Container from 'components/Container';
import BoxNumber from 'components/BoxNumber';
import CardTitle from 'components/CardTitle';
import HeaderAdmin from 'components/HeaderAdmin';
import TitlePage from 'components/TitlePage';
import * as S from './style';

const Home = () => {
  const navigate = useNavigate();
  const { apiService, setAlert } = useAdmin();
  const [totals, setTotals] = useState({ totals: { events: 0, gifts: 0, pendingPayouts: 0 } });
  const hasFetchedRef = useRef(false);

  const cardItems = [
    {
      title: 'Usuários',
      text: 'Gerencie os cadastros dos usuários',
      icon: 'fa-solid fa-users',
      color: 'var(--primary-color) ',
      link: '/users',
    },
    {
      title: 'Eventos',
      text: 'Administre os eventos de usuários',
      icon: 'fa-solid fa-calendar-days',
      color: 'var(--primary-color) ',
      link: '/events',
    },
    {
      title: 'Lista de Presente',
      text: 'Gerencie as listas de presentes dos eventos',
      icon: 'fa-solid fa-gift',
      color: 'var(--primary-color) ',
      link: '/gifts',
    },
    {
      title: 'Tipos de Evento',
      text: 'Gerencie tipos como marry, baby, etc.',
      icon: 'fa-solid fa-tags',
      color: 'var(--primary-color) ',
      link: '/event-types'
    },
    {
      title: 'Serviços',
      text: 'Controle os serviços disponíveis na plataforma',
      icon: 'fa-solid fa-briefcase',
      color: 'var(--primary-color) ',
      link: '/services',
    },
    {
      title: 'Repasses',
      text: 'Gerencie as solicitações de repasse',
      icon: 'fa-solid fa-money-bill-transfer',
      color: 'var(--primary-color)',
      link: '/payouts',
    },
    {
      title: 'Configurações',
      text: 'Ajuste configurações gerais',
      icon: 'fa-solid fa-gear',
      color: 'var(--primary-color)',
      link: '/settings',
    },
    {
      title: 'Sair',
      text: 'Encerrar sessão e sair do sistema',
      icon: 'fa-solid fa-right-from-bracket',
      color: 'var(--primary-color) ',
    },
  ];

  const fetchDashboardTotals = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/dashboard/retrieve`);
      const { success, message, totals } = await response.data;

      if (!success) throw new Error(message);
      if (totals) setTotals(totals);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar lista de transações.')
      });
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchDashboardTotals();
      hasFetchedRef.current = true;
    }
  }, [fetchDashboardTotals]);

  return (
    <S.Main>
      <HeaderAdmin />
      
      <Container>
        <S.Content>
          <TitlePage title="Painel Administrativo" icon="fa-solid fa-gauge" />

          <S.WrapperCards>
            <BoxNumber number={totals.events} text="Eventos ativos" />
            <BoxNumber number={totals.gifts} text="Presentes ativos" />
            <BoxNumber number={totals.pendingPayouts} text="Repasses pendentes" />
          </S.WrapperCards>

          <h2>Central de Controle</h2>

          <S.WrapperCardsTitle>
            {cardItems.map((item, index) => (
              <CardTitle
                key={index}
                title={item.title}
                text={item.text}
                icon={item.icon}
                color={item.color}
                onClick={() => {
                  if (item.title === 'Sair') {
                    localStorage.removeItem('adminToken');
                    localStorage.removeItem('adminId');
                    window.location.reload();
                    return;
                  }

                  navigate(item.link);
                }}
              />
            ))}
          </S.WrapperCardsTitle>
        </S.Content>
      </Container>
    </S.Main>
  );
};

export default Home;
