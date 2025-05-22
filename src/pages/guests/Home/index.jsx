import { useState, useContext, useEffect } from 'react';
import { GuestsContext } from 'contexts/Guests';
import Container from 'components/Container';
import GallerySlider from 'components/GallerySlider';
import logo from 'assets/logo-2.png';
import imageDefaultEvent from 'assets/default-image-event.avif';
import Messages from './Messages';
import GiftList from './GiftList';
import Info from './Info';
import Confirmation from './Confirmation';
import defaultBanner from 'assets/default-banner.jpg'
import defaultAvatar from 'assets/default-avatar-event.avif';
import * as S from './style';

const Home = () => {
  const { event, setEvent } = useContext(GuestsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [urlMap, setUrlMap] = useState(null);

  const profileImage = event.avatarUrl || defaultAvatar;
  const bannerImage = event.bannerUrl || defaultBanner;
  console.log(bannerImage)

  useEffect(() => {
    if (!event?.description) {
      setEvent({
        ...event,
        titleDescription: event?.titleDescription || `Sejam bem-vindos!`,
        description: `
          Estamos organizando esse evento com muito amor e carinho. Criamos esse espaço para facilitar para todos.
          
          E para aqueles que querem presentear com um MIMO, criamos uma lista de presentes online para evitar dúvidas, economizar tempo e incentivar o consumo consciente
          
          Por favor, confirmem a presença no site logo abaixo e deixem um recadinho!
        `
      });
    }

    setUrlMap(`/marker-map.html?lat=${-23.5505}&lon=${-46.6333}&color=${event.color}`);

  }, []);
  
  if (!event) return <div>Deu ruim!</div> 

  return (
    <S.Main>
      <S.Header>
        <Container>
          <S.Nav>
            <S.MenuButton onClick={() => setIsOpen(!isOpen)}>
              <i className="fa-solid fa-bars" />
            </S.MenuButton>
            <S.Logo>
              <img src={logo} alt="Logo listai" />
            </S.Logo>
          </S.Nav>

          <S.SideMenu className={`${isOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="/">Início</a></li>
              <li><a href="/presentes">Lista de Presentes</a></li>
              <li><a href="/confirmar">Confirmação</a></li>
              <li><a href="/mensagens">Recadinhos</a></li>
            </ul>
          </S.SideMenu>
        </Container>
      </S.Header>

      <S.Background src={bannerImage} />

      <Container>
        <S.WrapperProfile>
          <S.Avatar>
            <img src={profileImage} alt="Imagem de perfil" />
          </S.Avatar>
          <S.EventTitle>
            <h1 style={{ color: event?.color }}>{event.title}</h1>
            <h2>{event.subtitle}</h2>
          </S.EventTitle>
        </S.WrapperProfile>
      </Container>

      <S.SectionIntroduction>
        <Container>
          <div className="content">
            <article>
              <S.TitleSection style={{ color: event.color, textAlign: 'start', textTransform: 'capitalize' }}>
                {event.titleDescription}
              </S.TitleSection>
              <p dangerouslySetInnerHTML={{ __html: event?.description?.replace(/\n/g, '<br />') }} />
            </article>
            <div className="gallery">
              <GallerySlider gallery={event.gallery ? event.gallery : [{ url: imageDefaultEvent }]} />
            </div>
          </div>
        </Container>
      </S.SectionIntroduction>

      <GiftList event={event} />

      <Messages event={event} />

      <Info event={event} />

      <Confirmation event={event} />

      <S.Footer style={{ background: event.color }}>
        <Container>
          <small><i className="fa-solid fa-lock"></i> Ambiente seguro</small> <br />
          <small> © Listai. Todos os direitos reservados.</small>
          <small style={{ display: 'block', marginTop: -4 }}>CNPJ - 17.624.249/0001-70</small>
        </Container>
      </S.Footer>
    </S.Main>
  );
};

export default Home;