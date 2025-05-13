import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import NotFoundData from 'components/NotFoundData';
import imageDefault from 'assets/default-image.jpg';
import Button from 'components/Button';
import * as S from './style';

const EventGiftsReceived = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalTransferred, setTotalTransferred] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const getReceivedGifts = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`/users/events/${event.id}/received-gifts`);
      const { success, message, receivedGifts } = response.data;

      if (!success) throw new Error(message);
      if (receivedGifts) setReceivedGifts(receivedGifts);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar lista de presentes recebidos.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransactions = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`/users/events/${event.id}/transactions`);
      const {
        success,
        message,
        totalAvailable,
        totalReceived,
        totalTransferred,
        totalPending
      } = response.data;

      if (!success) throw new Error(message);

      setTotalTransferred(totalTransferred || 0);
      setTotalAvailable(totalAvailable || 0);
      setTotalReceived(totalReceived || 0);
      setTotalPending(totalPending || 0);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar lista de transações.')
      });
    } finally {
      setLoading(false);
    }
  };

  const RequestPayout = async () => {
    setLoading(true);
    try {
      const response = await apiService.get(`/users/events/${event.id}/payout-requests`);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check-circle',
        text: message,
      });
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao solicitar o repasse.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!event?.id) return;
    getTransactions();
    getReceivedGifts();
  }, [event?.id]);

  return (
    <main style={{ marginTop: 72 }}>
      <Container>
        <Header back={-1} background={event?.color} />

        <TitlePage title="Presentes Recebidos" align="center" />

        <S.Content>
          <S.CardContainer>
            <S.Card>
              <S.Amount>{ApplicationUtils.formatPrice(totalReceived)}</S.Amount>
              <S.Label>Total Recebido</S.Label>
            </S.Card>

            <S.Card>
              <S.Amount>{ApplicationUtils.formatPrice(totalTransferred)}</S.Amount>
              <S.Label>Total Retirado</S.Label>
            </S.Card>
          </S.CardContainer>

          <S.CardContainer>
            <S.Card style={{ color: 'green' }}>
              <S.Amount>{ApplicationUtils.formatPrice(totalAvailable)}</S.Amount>
              <S.Label>Disponível</S.Label>
              <br />
              {totalPending > 0 ? (
                <S.Label>
                  Repasse Pendente:{" "}
                  <strong style={{ color: 'red' }}>
                    {ApplicationUtils.formatPrice(totalPending)}
                  </strong>
                </S.Label>
              ) : (
                <Button
                  text="Solicitar repasse"
                  maxWidth={500}
                  margin="8px auto"
                  onClick={RequestPayout}
                  loading={loading}
                  disabled={loading || totalAvailable <= 0}
                />
              )}
            </S.Card>
          </S.CardContainer>

          <S.Divider />

          <h3>Todos os Presentes Recebidos</h3>
          {receivedGifts.length ? (
            receivedGifts.map((gift) => (
              <S.GiftCard key={gift.id}>
                <S.GuestName>{gift.guestName || 'Anônimo'}</S.GuestName>
                <S.DateText>
                  {ApplicationUtils.formatDate(gift.createdAt)}
                </S.DateText>

                <S.ItemsContainer>
                  <S.ItemsTitle>Itens:</S.ItemsTitle>
                  {gift.items.map((item) => (
                    <div
                      key={item.id}
                      style={{ display: 'flex', alignItems: 'center', marginBottom: '0.2em' }}
                    >
                      <S.GiftImage src={item.gift.imageUrl || imageDefault} alt={item.giftName} />
                      <S.ItemText style={{ marginLeft: 8 }}>
                        {item.giftName} (x{item.quantity})
                      </S.ItemText>
                    </div>
                  ))}
                </S.ItemsContainer>

                <S.TotalPrice>
                  Total: {ApplicationUtils.formatPrice(gift.userAmount)}
                </S.TotalPrice>
                <S.StatusText>
                  {ApplicationUtils.translateTransitionStatus(gift.status)}
                </S.StatusText>
              </S.GiftCard>
            ))
          ) : (
            <NotFoundData
              text="Nenhum presente para o evento."
              icon="fa-solid fa-box-open"
              active={receivedGifts.length === 0 && !loading}
            />
          )}
        </S.Content>
      </Container>
    </main>
  );
};

export default EventGiftsReceived;