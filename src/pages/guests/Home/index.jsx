import { useState, useContext, useEffect } from 'react';
import { GuestsContext } from 'contexts/Guests';
import Container from 'components/Container';
import GallerySlider from 'components/GallerySlider';
import imageDefaultEvent from 'assets/default-image-event.avif';
import NotFoundData from 'components/NotFoundData';
import Button from 'components/Button';
import LoadingLogo from 'components/LoadingLogo';
import Messages from './Messages';
import GiftList from './GiftList';
import Info from './Info';
import Confirmation from './Confirmation';
import defaultBanner from 'assets/default-banner.jpg'
import defaultAvatar from 'assets/default-avatar-event.avif';
import logo from 'assets/logo.png';
import * as S from './style';

const getSlugFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[1] || null;
};

const Home = () => {
  const slug = getSlugFromPath();  
  const { apiService, event, setEvent } = useContext(GuestsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState('loading'); //ready || erro

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  }

  const getEvent = async () => {
    try {
      const response = await apiService.get(`/guests/event/${slug}`);      
      const { success, message, event } = response.data;
      if (!success || !event) throw new Error(message);
      
      setEvent(event);
      setState('ready');

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

      document.documentElement.style.setProperty('--primary-color', event.color);
    } catch (error) {
      if (error?.response?.status === 404) {
        setState('not-found');
        return;
      }

      setState('error');
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (state === 'loading') return <LoadingLogo />;
  
  if (state === 'not-found' || state === 'error') return (
    <S.ContainerNotFound>
      <NotFoundData
        textSize="1.7rem"
        iconSize="120px"
        text={state === 'not-found' ? 'Evento não encontrado!' : 'Erro ao carregar o evento.'}
        icon='fa-solid fa-face-frown'
        active={true}
      />

      <Button
        text="Voltar ao início"
        maxWidth={240}
        onClick={() => (window.location.href = 'https://listai.com.br')}
      />
    </S.ContainerNotFound>
  );

  return (
    <S.Main>
      <S.Header>
        <Container>
          <S.Nav>
            <img 
              className="avatar" 
              src={event.avatarUrl || defaultAvatar} 
              alt="Imagem de perfil" 
            />
            <S.Logo>
              <img src={logo} alt="Logo listai" />
            </S.Logo>

            <S.MenuButton onClick={() => setIsOpen(!isOpen)}>
              <i className="fa-solid fa-bars" />
            </S.MenuButton>
          </S.Nav>
            
         {isOpen && <div className="background" />}
          
          <S.SideMenu className={`${isOpen ? 'open' : ''}`}>
            <div className="header">
              <i className="fa-solid fa-xmark" onClick={() => setIsOpen(false)} />
              <h3>Navegação</h3>
            </div>
            <ul>
              <li onClick={() => scrollToId('gifts')}>
                Lista de Presentes
              </li>
              <li onClick={() => scrollToId('confirmation')}>
                Confirmação
              </li>
              <li onClick={() => scrollToId('messages')}>
                Recadinhos
              </li>
            </ul>
          </S.SideMenu>
        </Container>
      </S.Header>

      <S.Background src={event.bannerUrl || defaultBanner} />

      <Container>
        <S.WrapperProfile>
          <S.Avatar>
            <img src={event.avatarUrl || defaultAvatar} alt="Imagem de perfil" />
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

      <S.Footer style={{ background: "var(--primary-color)" }}>
        <Container>
          <small><i className="fa-solid fa-lock"></i> Ambiente seguro</small> <br />
          <small> © Listai. Todos os direitos reservados.</small>
        </Container>
      </S.Footer>
    </S.Main>
  );
};

export default Home;