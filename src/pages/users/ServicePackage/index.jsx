import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Header from 'components/Header';
import * as S from './style';

const ServicePackage = () => {
  const navigate = useNavigate();
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [service, setService] = useState(null);
  const [servicesTurbo, setServicesTurbo] = useState([]);
  const [servicesDefault, setServicesDefault] = useState([]);

  const sendPurchaseRequest = async (service) => {
    try {
      setService(service);

      const response = await apiService.post(
        `/users/services/purchase`,
        { serviceId: service.id, eventId: event.id }
      );

      const { success, message, paymentLink } = response.data;
      if (!success || !paymentLink) throw new Error(message);

      window.location.href = paymentLink;
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços.')
      });
    }
  };

  const getServices = async () => {
    try {
      const response = await apiService.get('/users/services');
      const { success, message, services } = response.data;
      const servicesDefault = [];
      const servicesTurbo = [];

      if (!success) throw new Error(message);
      if (services) {
        services.map(item => {
          if (item.isDefault) {
            servicesDefault.push(item);
          } else {
            servicesTurbo.push(item);
          }
        });
      }

      setServicesTurbo(servicesTurbo);
      setServicesDefault(servicesDefault);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços.')
      });
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <Header back={-1} background={event.color} />
        <TitlePage
          title="Pacote de Serviços"
          subtitle="Serviços inclusos e para personalizar ainda mais"
          align="center"
        />

        <section style={{ textAlign: 'center', marginTop: 40 }}>
          <h3>Contratados</h3>
          <S.ServicesContainer>
            {servicesDefault.map((item, index) => (
              <S.Card key={index}>
                <S.Icon>📦</S.Icon>
                <S.Title>{item.name}</S.Title>
                <S.Description>{item.description}</S.Description>
                <S.Tag>Gratuito</S.Tag>
              </S.Card>
            ))}
          </S.ServicesContainer>
        </section>


        <section style={{ textAlign: 'center', marginTop: 40 }}>
          <h3>Pacotes Grátis</h3>
          <S.ServicesContainer>
            {servicesDefault.map((item, index) => (
              <S.Card key={index}>
                <S.Icon>📦</S.Icon>
                <S.Title>{item.name}</S.Title>
                <S.Description>{item.description}</S.Description>
                <S.Tag>Gratuito</S.Tag>
              </S.Card>
            ))}
          </S.ServicesContainer>
        </section>

        <section style={{ textAlign: 'center', marginTop: 40 }}>
          <h3>Serviços</h3>
          <h5 style={{ color: '#a9a9a9' }}>Turbine o Seu Site</h5>
          <S.ServicesContainer>
            {servicesTurbo.map((item, index) => (
              <S.Card key={index}>
                <S.Icon>📦</S.Icon>
                <S.Title>{item.name}</S.Title>
                <S.Description>{item.description}</S.Description>
                <S.Title>{ApplicationUtils.formatPrice(item.price)}</S.Title>
                <S.ButtonService onClick={() => sendPurchaseRequest(item)}>COMPRAR</S.ButtonService>
              </S.Card>
            ))}
          </S.ServicesContainer>
        </section>
      </Container>
    </main>
  );
};

export default ServicePackage;