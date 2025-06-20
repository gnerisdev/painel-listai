import { useEffect, useState, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Table from 'components/Table';
import Filter from 'components/Filter';
import Modal from 'components/Modal';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import ConfirmAction from 'components/ConfirmAction';
import LoadingLogo from 'components/LoadingLogo';
import Select from 'components/Select';
import * as S from './style';

const Transactions = () => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPaymentInfo, setCurrentPaymentInfo] = useState({});

  const [filters, setFilters] = useState({ status: 'pending', startDate: '', endDate: '' });

  const getTransactions = async (filters = {}) => {
    try {
      setLoading(true);

      let queryParams = '';
      if (filters.status) queryParams = `?status=${filters.status.toUpperCase()}`;

      const response = await apiService.get(`/admin/transactions${queryParams}`);
      const { success, message, transactions } = response.data;

      if (!success) throw new Error(message);
      if (transactions) {
        setTableData(transactions.map(item => ({
          id: item.id,
          eventId: item.event.id,
          name: item.guestName,
          email: item.guestEmail,
          userAmount: ApplicationUtils.formatPrice(item.userAmount) || '-',
          totalPrice: ApplicationUtils.formatPrice(item.totalPrice) || '-',
          percentage: item.percentage + '%',
          status: ApplicationUtils.translateTransactiontatus(item.status),
          createdAt: ApplicationUtils.formatDate(item.createdAt),
          originalData: item,
        })));
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar lista de transações.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions(filters);
  }, [filters]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const openInfoModal = async (transaction) => {
    try {
      setLoading(true);
      const response = await apiService.get(`/admin/transactions/${transaction.id}/info`);
      const { success, payment, message } = response.data;

      if (!success) throw new Error(message);

      console.log(payment)
      if (!payment) {
        setAlert({
          show: true,
          title: 'Informações de pagamento ausentes!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: 'Provavelmente o usuário ainda não gerou o pagamento.',
        });

        return;
      }

      setCurrentTransaction(transaction);
      setCurrentPaymentInfo(payment);
      setInfoModal(true);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao carregar detalhes da transação.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const openStatusModal = (transaction) => {
    setCurrentTransaction(transaction);
    setNewStatus(transaction.status);
    setStatusModal(true);
  };

  const updateTransactionStatus = async () => {
    if (!currentTransaction || !newStatus) return;

    try {
      setLoading(true);

      const response = await apiService.put(
        `/admin/transactions/${currentTransaction.id}/status`,
        { status: newStatus + '' }
      );

      const { success, message } = response.data;

      if (success) {
        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check-circle',
          text: message,
        });
        setStatusModal(false);
        getTransactions(filters);
      } else {
        setAlert({
          show: true,
          title: 'Erro!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: message || 'Erro ao atualizar o status da transação.',
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao atualizar o status da transação.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ marginTop: 72 }}>
      <Container>
        <TitlePage title="Transações" icon="fa-solid fa-receipt" />

        <S.Content>
          <Filter
            fields={[
              {
                name: "status",
                label: "Status",
                type: "select",
                options: [
                  { label: "Selecione", value: "" },
                  { label: "APROVADO", value: "APPROVED" },
                  { label: "PENDENTE", value: "PENDING" },
                  { label: "RECUSADO", value: "RECUSED" },
                  { label: "CANCELADO", value: "CANCELLED" },
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
              { label: "Email", name: "email" },
              { label: "Valor Usuário", name: "userAmount" },
              { label: "Valor Total", name: "totalPrice" },
              { label: "Porcentagem", name: "percentage" },
              { label: "Status", name: "status" },
              { label: "Data", name: "createdAt" },
            ]}
            actions={[
              {
                label: "<i class='fa-solid fa-info-circle'></i> Detalhes",
                onClick: (row) => openInfoModal(row.originalData),
              },
              {
                label: "<i class='fa-solid fa-rotate'></i> Atualizar Status",
                onClick: (row) => openStatusModal(row.originalData),
              },
            ]}
          />
        </S.Content>
      </Container>

      <Modal active={infoModal} updateShow={() => setInfoModal(false)} closeOut={true} title="Detalhes da Transação">
        <S.ModalContent>
          <div className="info">
            <h3>Detalhes do Pagamento</h3>
            <p><strong>ID do Pagamento:</strong> {currentPaymentInfo.id}</p>
            <p><strong>Valor da Transação:</strong> {ApplicationUtils.formatPrice(currentPaymentInfo.transaction_amount)}</p>
            <p><strong>Tipo de Pagamento:</strong> {currentPaymentInfo.payment_type_id}</p>
            <p><strong>Método de Pagamento:</strong> {currentPaymentInfo.payment_method_id}</p>
            <p><strong>Status do Pagamento:</strong> {currentPaymentInfo.status} ({currentPaymentInfo.status_detail})</p>
            <p><strong>Data de Criação do Pagamento:</strong> {ApplicationUtils.formatDate(currentPaymentInfo.date_created)}</p>
            <p><strong>Data da Última Atualização:</strong> {ApplicationUtils.formatDate(currentPaymentInfo.date_last_updated)}</p>
          </div>

          <div className="info">
            {currentPaymentInfo.payer && (
              <>
                <h3>Informações do Pagador:</h3>
                <p><strong>Email do Pagador:</strong> {currentPaymentInfo.payer.email || 'N/A'}</p>
              </>
            )}
          </div>

          <div className="info">
            {currentPaymentInfo.transaction_details && (
              <>
                <h3>Detalhes Adicionais da Transação:</h3>
                <p><strong>Instituição Financeira:</strong> {currentPaymentInfo.transaction_details.financial_institution || 'N/A'}</p>
                <p><strong>Valor Total Pago:</strong> {ApplicationUtils.formatPrice(currentPaymentInfo.transaction_details.total_paid_amount) || 'N/A'}</p>
              </>
            )}
          </div>

          <div className="info">
            {currentPaymentInfo.additional_info && currentPaymentInfo.additional_info.items && currentPaymentInfo.additional_info.items.length > 0 && (
              <>
                <h3>Itens do Pedido:</h3>
                {currentPaymentInfo.additional_info.items.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px', border: '1px solid #eee', padding: '10px' }}>
                    <p><strong>Item ID:</strong> {item.id}</p>
                    <p><strong>Título:</strong> {item.title}</p>
                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                    <p><strong>Preço Unitário:</strong> {ApplicationUtils.formatPrice(item.unit_price)}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </S.ModalContent>
      </Modal>

      <Modal active={statusModal} updateShow={() => setStatusModal(false)} closeOut={false}>
        <h2>Atualizar Status da transação</h2>
        {currentTransaction && (
          <FormContainer>
            <Select
              label="Status"
              value={newStatus}
              onChange={(value) => setNewStatus(value)}
              data={[
                { title: "Selecione", value: "" },
                { title: "APROVADO", value: "APPROVED" },
                { title: "PENDENTE", value: "PENDING" },
                { title: "RECUSADO", value: "RECUSED" },
                { title: "CANCELADO", value: "CANCELLED" },
              ]}
            />

            <Button text="Atualizar" onClick={() => updateTransactionStatus()} />
          </FormContainer>
        )}
      </Modal>

      {loading && <LoadingLogo />}
    </main>
  );
};

export default Transactions;