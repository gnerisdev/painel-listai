import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Table from 'components/Table';
import Button from 'components/Button';
import HeaderWithButton from 'components/HeaderWithButton';
import NotFoundData from 'components/NotFoundData';
import * as S from './style';

const EventServices = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const { setAlert, apiService } = useContext(AdminContext);
  const [contractedServices, setContractedServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);
  const [defaultServices, setDefaultServices] = useState([]);

  const getContractedServices = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/events/${eventId}/services/contracted`,);
      const { contractedServices: data, success, message } = response.data;

      if (!success) throw new Error(message);

      if (data) {
        const formatted = data.map((item) => ({
          ...item,
          title: item.name,
          active: item.active ? 'Ativo' : 'Inativo',
          type: ApplicationUtils.translateServiceType(item.type).toUpperCase(),
          price: ApplicationUtils.formatPrice(item.price) || '-',
        }));
        setContractedServices(formatted);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços contratados do evento.'),
      });
    }
  }, [apiService, setAlert, eventId]);

  const getPendingPaymentServices = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/events/${eventId}/services/pending-payments`);
      const { pendingServices: data, success, message } = response.data;

      if (!success) throw new Error(message);

      if (data) {
        const formatted = data.map((item) => ({
          ...item,
          title: item.name,
          status: 'PENDENTE',
          type: ApplicationUtils.translateServiceType(item.type).toUpperCase(),
          price: ApplicationUtils.formatPrice(item.price) || '-',
          expirationAt: ApplicationUtils.formatDate(item.expirationAt),
        }));
        setPendingServices(formatted);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços pendentes de pagamento.')
      });
    }
  }, [apiService, setAlert, eventId]);

  const getDefaultServices = useCallback(async () => {
    try {
      const response = await apiService.get(`/admin/events/${eventId}/services/default`);
      const { servicesDefault: data, success, message } = response.data;

      if (!success) throw new Error(message);

      if (data) {
        const formatted = data.map((item) => ({
          ...item,
          type: ApplicationUtils.translateServiceType(item.type).toUpperCase(),
          price: ApplicationUtils.formatPrice(item.price) || '-',
        }));
        setDefaultServices(formatted);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços padrão.'),
      });
    }
  }, []);

  useEffect(() => {
    getContractedServices();
    getPendingPaymentServices();
    getDefaultServices();
  }, [getContractedServices, getPendingPaymentServices, getDefaultServices]);

  const contractedActions = [
    {
      label: '<i class="fa-solid fa-pen"></i> Editar Informações',
      onClick: (row) => navigate(`/services/${row.id}`),
    },
  ];

  const defaultServiceActions = [
    {
      label: '<i class="fa-solid fa-pen"></i> Editar Serviço Padrão',
      onClick: (row) => navigate(`/service-types/${row.id}`),
    },
  ];

  return (
    <Container>
      <HeaderWithButton>
        <TitlePage
          title="Serviços do Evento"
          icon="fa-solid fa-hand-holding-dollar"
        />

        {/* <Button
          onClick={() => navigate('/service-types/add')}
          text="Add serviço ao evento"
          maxWidth="240px"
        />  */}
      </HeaderWithButton>

      <S.Main>
        <S.Details>
          <summary>
            <div className="summary-left">
              <h3>Serviços Contratados</h3>
            </div>
            <div className="summary-chevron-up">
              <span className="fa-solid fa-chevron-down" />
            </div>
          </summary>

          {contractedServices.length > 0 ? (
            <Table
              data={contractedServices}
              columns={[
                { label: 'Título', name: 'name' },
                { label: 'Preço', name: 'price' },
                { label: 'Tipo', name: 'type' },
                { label: 'Quantidade', name: 'quantity' },
              ]}
              actions={contractedActions}
            />
          ) : (
            <NotFoundData
              active={true}
              text="Nenhum serviço contratado para este evento."
              icon="fa-solid fa-search-dollar"
            />
          )}
        </S.Details>

        <S.Details>
          <summary>
            <div className="summary-left">
              <h3>Pendentes</h3>
            </div>
            <div className="summary-chevron-up">
              <span className="fa-solid fa-chevron-down" />
            </div>
          </summary>

          {pendingServices.length > 0 ? (
            <Table
              data={pendingServices}
              actions={contractedActions}
              columns={[
                { label: 'Título', name: 'title' },
                { label: 'Preço', name: 'price' },
                { label: 'Tipo', name: 'type' },
                { label: 'Status', name: 'status' },
                { label: 'Expira Em', name: 'expirationAt' },
              ]}
            />
          ) : (
            <NotFoundData
              active={true}
              text="Nenhum serviço pendente de pagamento para este evento."
              icon="fa-solid fa-hourglass-half"
            />
          )}
        </S.Details>

        <S.Details>
          <summary>
            <div className="summary-left">
              <h3>Padrão Disponíveis</h3>
            </div>
            <div className="summary-chevron-up">
              <span className="fa-solid fa-chevron-down" />
            </div>
          </summary>

          {defaultServices.length > 0 ? (
            <Table
              data={defaultServices}
              actions={defaultServiceActions}
              columns={[
                { label: 'Título', name: 'name' },
                { label: 'Tipo', name: 'type' },
              ]}
            />
          ) : (
            <NotFoundData
              active={true}
              text="Nenhum serviço padrão disponível cadastrado."
              icon="fa-solid fa-list-check"
            />
          )}
        </S.Details>
      </S.Main>
    </Container>
  );
};

export default EventServices;
