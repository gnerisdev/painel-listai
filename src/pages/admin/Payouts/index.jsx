import { useEffect, useState, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Table from 'components/Table';
import Filter from 'components/Filter';
import Modal from 'components/Modal';
import FormContainer from 'components/FormContainer';
import Input from 'components/Input';
import * as S from './style';
import Button from 'components/Button';
import ConfirmAction from 'components/ConfirmAction';

const Payouts = () => {
  const { apiService, event, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [currentPayout, setCurrentPayout] = useState(null);
  const [paidAmount, setPaidAmount] = useState('');
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({ status: 'pending' });

  const getPayouts = async (filters = {}) => {
    try {
      setLoading(true);

      let queryParams = '';
      if (filters.status) queryParams = `?status=${filters.status.toUpperCase()}`;

      const response = await apiService.get(`/admin/payouts${queryParams}`);
      const { success, message, payouts } = response.data;

      if (!success) throw new Error(message);
      if (payouts) {
        setTableData(payouts.map(item => ({
          id: item.id,
          eventId: item.eventId,
          name: `${item.user?.firstName} ${item.user?.lastName}`,
          event: item.event.title,
          requestedAmount: ApplicationUtils.formatPrice(item.requestedAmount) || '-',
          paidAmount: ApplicationUtils.formatPrice(item.paidAmount) || '-',
          status: ApplicationUtils.translatePayoutStatus(item.status),
          createdAt: ApplicationUtils.formatDate(item.createdAt),
          originalData: item,
        })));
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar lista de repasses.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayouts(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const openConfirmationModal = (payout) => {
    setPaidAmount(ApplicationUtils.formatPrice(payout.requestedAmount));
    setCurrentPayout(payout);
    setModal(true);
  };

  const concludePayoutRequest = async () => {
    if (!currentPayout) return;

    const amountToSend = ApplicationUtils.parsePrice(paidAmount);

    if (isNaN(amountToSend) || amountToSend <= 0) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-exclamation-triangle',
        text: 'Por favor, insira um valor válido para o repasse.',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.put(`/admin/payouts/${currentPayout.id}/conclude`, { paidAmount: amountToSend });
      const { success, message } = response.data;

      if (success) {
        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check-circle',
          text: message,
        });
        setModal(false);
        getPayouts(filters);
      } else {
        setAlert({
          show: true,
          title: 'Erro!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: message || 'Erro ao concluir o repasse.',
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao concluir o repasse.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ marginTop: 72 }}>
      <Container>
        <TitlePage title="Lista de Repasses" icon="fa-solid fa-wallet" />

        <S.Content>
          <Filter
            fields={[
              {
                name: "status",
                label: "Status",
                type: "select",
                options: [
                  { label: "Selecione", value: "" },
                  { label: "PENDENTE", value: "pending" },
                  { label: "PAGO", value: "paid" },
                  { label: "FALHOU", value: "failed" },
                  { label: "CANCELADO", value: "cancelled" },
                ],
              },
            ]}
            onSearch={handleFilterChange}
            filterValues={filters}
          />

          <Table
            data={tableData}
            columns={[
              { label: "ID", name: "id" },
              { label: "ID Evento", name: "eventId" },
              { label: "Nome", name: "name" },
              { label: "Evento", name: "event" },
              { label: "Valor", name: "requestedAmount" },
              { label: "Valor Pago", name: "paidAmount" },
              { label: "Status", name: "status" },
              { label: "Solicitação em", name: "createdAt" },
            ]}
            actions={[
              {
                label: "<i class='fa-solid fa-check'></i> Concluir Repasse",
                onClick: (row) => openConfirmationModal(row.originalData),
                condition: (row) => row.status.toLowerCase() === 'pendente',
              },
            ]}
          />
        </S.Content>
      </Container>

      <Modal active={modal} updateShow={() => setModal(false)} closeOut={false} title="Confirmação de Repasse">
        <h2>Concluir Repasse</h2>
        <FormContainer>
          <Input
            label="Valor a ser repassado"
            value={paidAmount}
            onChange={(value) => setPaidAmount(ApplicationUtils.formatToInputPrice(value))}
          />

          <ConfirmAction
            text={`Deseja confirmar o repasse de ${paidAmount} para ${currentPayout?.user?.firstName} ${currentPayout?.user?.lastName || ''}?`}
            onConfirm={concludePayoutRequest}
          >
            <Button text="Concluir" onClick={() => {}} />
          </ConfirmAction>
        </FormContainer>
      </Modal>
    </main>
  );
};

export default Payouts;