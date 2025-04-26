import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import * as S from './style';

const Confirmations = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [guests, setGuests] = useState([]);
  const color = event.color;

  const getConfirmations = async () => {
    try {
      const response = await apiService.get(`/users/guests/${event.id}`);
      const { success, guests, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao confirmar presença.');
      if (guests) setGuests(guests);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(
          error,
          'Erro ao confirmar presença.',
        ),
      });
    }
  };

  useEffect(() => {
    getConfirmations();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <Header back={-1} background={event.color} />
        <TitlePage title="Lista de Presença" align="center" />

        <S.Content>
          <S.ButtonGroup>
            <S.NewGuestButton>NOVO CONVIDADO</S.NewGuestButton>
            <S.DownloadListButton>BAIXAR LISTA</S.DownloadListButton>
          </S.ButtonGroup>

          <S.SectionTitle>Convidados Confirmados</S.SectionTitle>

          {guests.map((item) => (
            <S.GuestCard>
              <S.GuestInfo>
                <strong>
                  {item.firstName} {item.lastName}
                </strong>
                <div>{item.email}</div>
                <div>{item.phoneNumber}</div>
                <S.Tag style={{ background: color }}>CHILD-0-4</S.Tag>
              </S.GuestInfo>

              <S.ActionButtons>
                <S.ButtonIcon
                  style={{ background: color }}
                  className="fa-solid fa-pen"
                />
                <S.ButtonIcon
                  style={{ background: color }}
                  className="fa-solid fa-trash"
                />
              </S.ActionButtons>
            </S.GuestCard>
          ))}
        </S.Content>
      </Container>
    </main>
  );
};

export default Confirmations;
