import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from 'contexts/Users';
import Container from 'components/Container';
import Button from 'components/Button';
import BoxNumber from 'components/BoxNumber';
import CardTitle from 'components/CardTitle';
import SidebarMenu from 'components/SidebarMenu';
import * as S from './style';

const Home = () => {
  const navigate = useNavigate();
  const { user, event } = useContext(UsersContext);
  
  const menuItems = [
    { icon: "fa-solid fa-house", label: "Home", link: "/" },
    { icon: "fa-solid fa-gift", label: "Presentes recebidos", link: "/gifts" },
    { icon: "fa-solid fa-check-square", label: "Confirmação de presença", link: "/confirmations" },
    { icon: "fa-solid fa-comment-dots", label: "Recados", link: "/messages" },
    { icon: "fa-solid fa-right-from-bracket", label: "Sair", link: "/logout" },
  ];  

  const cardItems = [
    {
      title: "Cores e Textos",
      text: "Deixe o site do seu evento com a sua cara",
      icon: "fa-solid fa-pen-to-square",
      color: "#a0d468",
      link: '/custom'
    },
    {
      title: "Galeria de Fotos e Vídeos",
      text: "Compartilhe momentos inesquecíveis",
      icon: "fa-regular fa-image",
      color: "#5d9cec",
      link: '/gallery'
    },
    {
      title: "Informações do Evento",
      text: "Tudo em um só lugar para seu convidado",
      icon: "fa-regular fa-calendar",
      color: "#ac92eb",
      link: '/info'
    },
    {
      title: "Lista de Presentes",
      text: "Adicione mais detalhes ao seu site",
      icon: "fa-solid fa-gift",
      color: "#ff779d",
      link: '/gifts'      
    },
    {
      title: "Pacote de Serviços",
      text: "Serviços para personalizar ainda mais o seu site",
      icon: "fa-solid fa-box",
      color: "#77d5b2",
      link: '/service-package'
    },
    {
      title: "Configurações do Site",
      text: "Segurança e praticidade em primeiro lugar",
      icon: "fa-solid fa-gear",
      color: "#1d304c",
      link: '/settings'  
    },
    {
      title: "Compartilhar o Seu Site",
      text: "Clique para compartilhar com os amigos e familiares",
      icon: "fa-regular fa-paper-plane",
      color: "#1d304c",
    },
  ];


  useEffect(() => {
    // getOrdersDashboard();
    // getTopSellingProducts();
  }, []);

  return (
    <S.Main>
      <Container>
        <S.Background src="https://painel.mimon.com.br/assets/images/capa-debutante.jpg" />
        <S.WrapperProfile>
          <S.Avatar>
            <img
              src="https://painel.mimon.com.br/assets/images/debutante-roxo-2.png"
              alt="Imagem de perfil"
            />
          </S.Avatar>
          <S.AvatarTitle>
            <h2>{event.title}</h2>
            <h6>{event.subtitle}</h6>
          </S.AvatarTitle>
          <S.WrapperButton>
            <Button 
              text="Visitar meu site" 
              background={event.color} 
              onClick={() => {
                let host = window.location.hostname;
                host = host.replace('users.', '')
                  .replace('localhost', 'localhost:3001');
                const url = `http://sites.${host}/${event.slug}`;
                window.open(url, '_blank');
              }}
            />
          </S.WrapperButton>
        </S.WrapperProfile>

        <S.Content>
          <div>
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
              userName={user.first_name + " " + user.last_name}
            />
          </S.WrapperSidebar>
        </S.Content>
      </Container>
    </S.Main>
  );
};

export default Home;