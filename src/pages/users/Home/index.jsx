import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import Button from 'components/Button';
import BoxNumber from 'components/BoxNumber';
import CardTitle from 'components/CardTitle';
import SidebarMenu from 'components/SidebarMenu';
import naviagtionItems from './NavigationItems';
import * as S from './style';
import ListEventServices from 'components/ListEventServices';
import TitlePage from 'components/TitlePage';

const Home = () => {
  const navigate = useNavigate();
  const { user, event, apiService, setAlert } = useContext(UsersContext);
  const [profileImage, setProfileImage] = useState(
    event.avatarUrl ||
    'https://painel.mimon.com.br/assets/images/debutante-roxo-2.png'
  );
  const [backgroundImage, setBackgroundImage] = useState(
    event.bannerUrl ||
    'https://painel.mimon.com.br/assets/images/capa-debutante.jpg'
  );

  const handleFileUpload = async (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: 'Por favor, selecione um arquivo de imagem.'
      });

      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await apiService.post(`/users/event/${event.id}/upload/${type}`, formData, true);
      const { success, message, bannerUrl, avatarUrl} = await response.data;

      if (!success) throw new Error(message);
      if (bannerUrl || avatarUrl) {
        if (type === 'avatar') {
          setProfileImage(avatarUrl);
        } else if (type === 'banner') {
          setBackgroundImage(bannerUrl);
        }

        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Imagem atualizada!',
        });
      } 
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao realizar o upload da imagem.'),
      });
    }
  };

  const getUrlSite = () => {
    let host = window.location.hostname;
    host = host.replace('users.', '').replace('localhost', 'localhost:3001');
    const url = `http://sites.${host}/${event.slug}`;
    return url;
  };

  return (
    <S.Main>
      <S.WrapperBackground>
        <S.Background src={backgroundImage} />
        <S.ButtonIcon style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
          <span className="fa-solid fa-pencil" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'banner')}
          />
        </S.ButtonIcon>
      </S.WrapperBackground>

      <Container>
        <S.WrapperProfile>
          <S.Avatar>
            <img
              src={profileImage}
              alt="Imagem de perfil"
            />
            <S.ButtonIcon>
              <span className="fas fa-camera" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'avatar')}
              />
            </S.ButtonIcon>
          </S.Avatar>

          <S.AvatarTitle>
            <h2>{event.title}</h2>
            <h6>{event.subtitle}</h6>
          </S.AvatarTitle>
          <S.WrapperButton>
            <Button
              text="Visitar meu site"
              background={event.color}
              onClick={() => window.open(getUrlSite(), '_blank')}
            />
          </S.WrapperButton>
        </S.WrapperProfile>
      </Container>

      <Container>
        <S.Content>
          <div>
            <S.WrapperCards>
              <BoxNumber number="0" text="pessoas confirmadas" />
              <BoxNumber number="0" text="presentes recebidos" />
              <BoxNumber number="0" text="recados recebidos" />
            </S.WrapperCards>

            <S.Personalize>
              <TitlePage title="Personalize" align="center" />

              <S.WrapperCardsTitle>
                {naviagtionItems.cardItems.map((item, index) => (
                  <CardTitle
                    key={index}
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                    color={item.color}
                    onClick={() => {
                      if (item.link === '/shared-whatsapp') {
                        const message = `
                          Você é nosso convidado! Click no LINK para ver todas as informações
                          do evento, confirmação de presença, envio de recadinhos e lista de
                          presentes virtuais, onde você presenteia sem dúvidas, promovendo o
                          consumo consciente. ${getUrlSite()}
                        `;

                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message.trim())}`;
                        window.open(whatsappUrl, '_blank');
                        return;
                      }

                      navigate(item.link);
                    }}
                  />
                ))}
              </S.WrapperCardsTitle>
            </S.Personalize>

            <br />

            <ListEventServices displayType="turbo" />
          </div>

          <S.WrapperSidebar>
            <SidebarMenu
              menuItems={naviagtionItems.menuItems}
              userName={user.first_name + ' ' + user.last_name}
            />
          </S.WrapperSidebar>
        </S.Content>
      </Container>
    </S.Main>
  );
};

export default Home;