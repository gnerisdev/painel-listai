import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Button from 'components/Button';
import NotFoundData from 'components/NotFoundData';
import Table from 'components/Table';
import FormConfirmationModal from './FormConfirmationModal';
import HeaderWithButton from 'components/HeaderWithButton';
import * as S from './style';

const EventGuestConfirmations = () => {
  const { id } = useParams();
  const { apiService, setAlert } = useContext(AdminContext);
  const [guests, setGuests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState(null);

  const getGuestConfirmations = async () => {
    try {
      const response = await apiService.get(`/admin/events/${id}/guests`);
      const { success, guests: guestsData, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao carregar lista de presença.');
      if (guestsData) {
        const table = guestsData.map(item => ({
          ...item,
          name: item.firstName + ' ' + item.lastName,
          createdAt: ApplicationUtils.formatDate(item.createdAt)
        }));

        setGuests(guestsData);
        setTableData(table || []);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao carregar lista de presença.'),
      });
    }
  };

  const openCreateModal = () => {
    setGuestToEdit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (guestData) => {
    setGuestToEdit(guestData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGuestToEdit(null);
  };

  const handleGuestUpdated = () => {
    getGuestConfirmations();
  };

  useEffect(() => {
    getGuestConfirmations();
  }, [id]);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <Header back={-1} />

        <HeaderWithButton>
          <TitlePage title="Lista de Presença" icon="fa-solid fa-clipboard-list" />
          <Button 
            text="<i class='fa-solid fa-user-plus'></i> NOVO CONVIDADO" 
            onClick={openCreateModal} 
            maxWidth={200} 
          />
        </HeaderWithButton>

        <S.Content>
          <NotFoundData
            active={!guests || guests?.length < 1}
            text="Nenhum convidado confirmado para o evento"
            icon="fa-solid fa-user-xmark"
          />

          {(tableData?.length > 0) && (
            <Table
              data={tableData}
              columns={[
                { label: "ID", name: "id" },
                { label: "ID Evento", name: "eventId" },
                { label: "Nome", name: "name" },
                { label: "Email", name: "email" },
                { label: "Contato", name: "phoneNumber" },
                { label: "Data de confirmação", name: "createdAt" },
              ]}
              actions={[
                {
                  label: "<i class='fa-solid fa-lapis'></i> Editar informações",
                  onClick: openEditModal,
                }
              ]}
            />
          )}
        </S.Content>
      </Container>

      <FormConfirmationModal
        eventId={id}
        open={isModalOpen}
        onClose={handleCloseModal}
        onGuestUpdated={handleGuestUpdated}
        guestToEdit={guestToEdit}
      />
    </main>
  );
};

export default EventGuestConfirmations;