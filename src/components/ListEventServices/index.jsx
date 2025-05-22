import { useCallback, useContext, useEffect, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import * as S from './style';

const ListEventServices = ({ displayType = 'all', displayPendingPaymentServices = true }) => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [services, setServices] = useState({ default: [], turbo: [], contracted: [] });
  const [pendingPaymentServices, setPendingPaymentServices] = useState([]);

  const sendPurchaseRequest = async (service) => {
    try {
      const response = await apiService.post(
        `/users/services/purchase`,
        { serviceId: service.id, eventId: event.id }
      );

      const { success, message, paymentLink } = response.data;
      if (!success || !paymentLink) throw new Error(message);

      window.open(paymentLink);

      if (displayPendingPaymentServices) getPendingPaymentServices();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao iniciar o pagamento do serviço.')
      });
    }
  };

  const getServices = async () => {
    try {
      const response = await apiService.get(`/users/events/${event.id}/services`);
      const { success, message, services } = response.data;

      if (!success) throw new Error(message);
      if (services) setServices(services);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços.')
      });
    }
  };

  const getPendingPaymentServices = async () => {
    if (!event || !event.id) return;

    const response = await apiService.get(`/users/events/${event.id}/pending-payment-services`);
    const { success, message, pendingServices } = response.data;

    if (!success) throw new Error(message);
    if (pendingServices) setPendingPaymentServices(pendingServices);
  };

  useEffect(() => {
    getServices();
    if (displayPendingPaymentServices) getPendingPaymentServices();
  }, []);

  const renderServiceCards = (serviceList, type = 'default') => (
    serviceList.map((item) => (
      <S.Card key={item.id}>
        <S.Icon>📦</S.Icon>
        <S.Title>{item.name}</S.Title> 
        
        {type !== 'pending' && <S.Description>{item.description}</S.Description>}

        
        {type === 'turbo' && (
          <>
            <S.Title>{ApplicationUtils.formatPrice(item.price)}</S.Title>
            <S.ButtonService onClick={() => sendPurchaseRequest(item)}>COMPRAR</S.ButtonService>
          </>
        )}

        {type === 'default' && <S.Tag>Gratuito</S.Tag>}
        
        {type === 'contracted' && <S.Tag>Contratado</S.Tag> }
        
        {type === 'pending' && (
          <>
            {item.expirationAt && (
              <S.SmallText>Vence em: {ApplicationUtils.formatDate(item.expirationAt)}</S.SmallText>
            )}
            <S.ButtonService 
              style={{ textTransform: 'uppercase' }} 
              onClick={() => sendPurchaseRequest(item)}
            >
              Continuar Pagamento
            </S.ButtonService>
          </>
        )}
      </S.Card>
    ))
  );

  return (
    <>
      {displayPendingPaymentServices && pendingPaymentServices && pendingPaymentServices.length > 0 && (
        <S.Services>
          <h3>Serviços com Pagamento Pendente</h3>
          <h5 style={{ color: '#a9a9a9' }}>Finalize o pagamento para ativar.</h5>
          <S.ContainerCard>
            {renderServiceCards(pendingPaymentServices, 'pending')}
          </S.ContainerCard>
        </S.Services>
      )}

      {(displayType === 'all' || displayType === 'contracted') && services.contracted && services.contracted.length > 0 && (
        <S.Services>
          <h3>Contratados</h3>
          <S.ContainerCard>
            {renderServiceCards(services.contracted, 'contracted')}
          </S.ContainerCard>
        </S.Services>
      )}

      {(displayType === 'all' || displayType === 'default') && services.default && services.default.length > 0 && (
        <S.Services>
          <h3>Pacotes Grátis</h3>
          <S.ContainerCard>
            {renderServiceCards(services.default, 'default')}
          </S.ContainerCard>
        </S.Services>
      )}

      {(displayType === 'all' || displayType === 'turbo') && services.turbo && services.turbo.length > 0 && (
        <S.Services>
          <h3>Serviços</h3>
          <h5 style={{ color: '#a9a9a9' }}>Turbine o Seu Site</h5>
          <S.ContainerCard>
            {renderServiceCards(services.turbo, 'turbo')}
          </S.ContainerCard>
        </S.Services>
      )}

      {displayType === 'all' &&
        (!services.contracted || services.contracted.length === 0) &&
        (!services.default || services.default.length === 0) &&
        (!services.turbo || services.turbo.length === 0) &&
        (!displayPendingPaymentServices || pendingPaymentServices.length === 0) && (
          <p style={{ textAlign: 'center', marginTop: 40 }}>Nenhum serviço disponível.</p>
        )}
    </>
  );
};

export default ListEventServices;