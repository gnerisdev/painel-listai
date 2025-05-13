import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import NotFoundData from 'components/NotFoundData';
import imageDefault from 'assets/default-image.jpg';
import * as S from './style';

const EventGiftsReceived = () => {
  const { id } = useParams();
  
  const { apiService, event, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [receivedGifts, setReceivedGifts] = useState([]);
  const [totalReceived, setTotalReceived] = useState(0);
  const [totalTransferred, setTotalTransferred] = useState(0);
  const [totalAvailable, setTotalAvailable] = useState(0);
  const [totalPending, setTotalPending] = useState(0);

  const getReceivedGifts = async () => {
    try {
      setLoading(true);

      const response = await apiService.get(`/admin/events/${id}/received-gifts`);
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
      const response = await apiService.get(`/admin/events/${id}/transactions`);
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

  useEffect(() => {
    if (!id) return;
    getTransactions();
    getReceivedGifts();
  }, []);

  return (
    <main style={{ marginTop: 72 }}>
      <Container>
        <Header back={-1} background={event?.color} />

        <TitlePage title="Presentes Recebidos" icon="fa-solid fa-gift" />

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
              {totalPending && (
                <S.Label>
                  Repasse Pendente:{" "}
                  <strong style={{ color: 'red' }}>
                    {ApplicationUtils.formatPrice(totalPending)}
                  </strong>
                </S.Label>
              )}
            </S.Card>
          </S.CardContainer>

          <S.Divider />

          <h2>Todos os Presentes Recebidos</h2> <br />
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