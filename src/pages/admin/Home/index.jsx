import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import BoxNumber from 'components/BoxNumber';
import CardTitle from 'components/CardTitle';
import SidebarMenu from 'components/SidebarMenu';
import HeaderAdmin from 'components/HeaderAdmin';
import TitlePage from 'components/TitlePage';
import * as S from './style';
import { AdminContext } from 'contexts/Admin';

const Home = () => {
  const navigate = useNavigate();
  const { admin } = useContext(AdminContext);

  const menuItems = [
    { icon: 'fa-solid fa-house', label: 'Home' },
    { icon: 'fa-solid fa-gift', label: 'Presentes recebidos' },
    { icon: 'fa-solid fa-check-square', label: 'Confirmação de presença' },
    { icon: 'fa-solid fa-comment-dots', label: 'Recados' },
    { icon: 'fa-solid fa-user', label: 'Perfil' },
    { icon: 'fa-solid fa-right-from-bracket', label: 'Sair' },
  ];

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
      title: 'Configurações',
      text: 'Ajuste configurações gerais e de segurança',
      icon: 'fa-solid fa-gear',
      color: 'var(--primary-color) ',
    },
  ];

  useEffect(() => {
    // getOrdersDashboard();
    // getTopSellingProducts();
  }, []);

  return (
    <S.Main>
      <HeaderAdmin />
      <Container>
        <S.Content>
          <div>
            <TitlePage title="Painel Administrativo" icon="fa-solid fa-gauge" />

            <S.WrapperCards>
              <BoxNumber number="0" text="pessoas confirmadas" />
              <BoxNumber number="0" text="presentes recebidos" />
              <BoxNumber number="0" text="recados recebidos" />
            </S.WrapperCards>

            <S.Personalize>
              <h2>Personalize</h2>

              <S.WrapperCardsTitle>
                {cardItems.map((item, index) => (
                  <CardTitle
                    key={index}
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                    color={item.color}
                    onClick={() => navigate(item.link)}
                  />
                ))}
              </S.WrapperCardsTitle>
            </S.Personalize>
          </div>

          <S.WrapperSidebar>
            <SidebarMenu
              menuItems={menuItems}
              userName={admin.firstName + " " + admin.lastName}
            />
          </S.WrapperSidebar>
        </S.Content>
      </Container>
    </S.Main>
  );
};

export default Home;
