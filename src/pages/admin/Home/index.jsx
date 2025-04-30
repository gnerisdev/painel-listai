import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from 'contexts/Admin'
import Container from 'components/Container'
import BoxNumber from 'components/BoxNumber'
import CardTitle from 'components/CardTitle'
import SidebarMenu from 'components/SidebarMenu'
import HeaderAdmin from 'components/HeaderAdmin'
import TitlePage from 'components/TitlePage';
import * as S from './style'

const Home = () => {
  const navigate = useNavigate()
  const {} = useContext(AdminContext)

  const menuItems = [
    { icon: 'fa-solid fa-house', label: 'Home' },
    { icon: 'fa-solid fa-gift', label: 'Presentes recebidos' },
    { icon: 'fa-solid fa-check-square', label: 'Confirmação de presença' },
    { icon: 'fa-solid fa-comment-dots', label: 'Recados' },
    { icon: 'fa-solid fa-user', label: 'Perfil' },
    { icon: 'fa-solid fa-right-from-bracket', label: 'Sair' },
  ]

  const cardItems = [
    {
      title: 'Usuários',
      text: 'Gerencie os cadastros dos usuários',
      icon: 'fa-solid fa-users',
      color: '#4CAF50', 
      link: '/users',
    },
    {
      title: 'Eventos',
      text: 'Administre os eventos cadastrados no sistema',
      icon: 'fa-solid fa-calendar-days',
      color: '#2196F3', 
      link: '/events',
    },
    {
      title: 'Lista de Presente',
      text: 'Gerencie as listas de presentes dos eventos',
      icon: 'fa-solid fa-gift',
      color: '#9C27B0', 
      link: '/info',
    },
    {
      title: 'Tipo/Categoria de Presente',
      text: 'Gerencie os tipos e categorias de presentes disponíveis',
      icon: 'fa-solid fa-tags',
      color: '#FF9800',
    },
    {
      title: 'Serviços',
      text: 'Controle os serviços disponíveis na plataforma',
      icon: 'fa-solid fa-briefcase',
      color: '#03A9F4', 
      link: '/services',
    },
    {
      title: 'Configurações',
      text: 'Ajuste configurações gerais e de segurança',
      icon: 'fa-solid fa-gear',
      color: '#607D8B',
    },
  ];
  
  useEffect(() => {
    // getOrdersDashboard();
    // getTopSellingProducts();
  }, [])

  return (
    <S.Main>
      <HeaderAdmin />
      <Container>
        <S.Content>
          <div>
            <TitlePage title="Página Inicial" icon="fa-solid fa-house" />

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
              // userName={admin.first_name + " " + admin.last_name}
            />
          </S.WrapperSidebar>
        </S.Content>
      </Container>
    </S.Main>
  )
}

export default Home
