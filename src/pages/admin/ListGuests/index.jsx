import { useState, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Table from 'components/Table';
import Filter from 'components/Filter';
import { mockApiService } from '../../../services/mockApiServer';
import * as S from './style';


const ListGuests = () => {
  const { setAlert } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    const eventId = filters.id;

    if (!eventId) {
      setAlert({
        show: true,
        title: 'Campo obrigatório',
        type: 'warning',
        text: 'O ID do evento é obrigatório para realizar a busca.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await mockApiService.get(`/admin/events/${eventId}/guests`)
      if (response.data?.success && Array.isArray(response.data.data)) {
        const guests = response.data.data;
        console.log('guests', response)
        const formattedGuests = guests.map(guest => ({
          guestEmail: guest.email || '-',
          guestPhoneNumber: guest.phone_number || '-',
          confirmed: guest.confirmed !== undefined ? (guest.confirmed ? 'Sim' : 'Não') : '-',
          confirmed_at: guest.confirmed_at ? ApplicationUtils.formatDate(guest.confirmed_at) : '-',
          updated_at: ApplicationUtils.formatDate(guest.updated_at)
        }));

        setTableData(formattedGuests);
        
        if (formattedGuests.length === 0) {
          setAlert({
            show: true,
            title: 'Nenhum convidado encontrado',
            type: 'info',
            text: 'Não existem convidados para este evento.',
          });
        }
      } else {
        throw new Error('Resposta da API inválida');
      }
    } catch (error) {
      setTableData([]);
      setAlert({
        show: true,
        title: 'Erro na requisição',
        type: 'error',
        text: `Falha ao carregar convidados: ${ApplicationUtils.getErrorMessage(error)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>loading....</div>;

  return (
    <Container>
      <TitlePage title="Listar Convidados de um Evento" icon="fa-solid fa-users" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              {
                name: 'id',
                label: 'ID',
                placeholder: 'Digite um ID de evento..',
              },
            ]}
            onSearch={handleSearch}
          />
        </S.WrapperFilter>

        <Table
          data={tableData}
          columns={[
            { label: 'Email', name: 'guestEmail' },
            { label: 'Telefone', name: 'guestPhoneNumber' },
            { label: 'Confirmado', name: 'confirmed' },
            { label: 'Data da Confirmação', name: 'confirmed_at' },
            { label: 'Atualizado em', name: 'updated_at' },
          ]}
          showOptions={false} 
          actions={null}
        />
      </S.Content>
      <S.TitleModal>
      </S.TitleModal>
    </Container>
  );
};

export default ListGuests;
