import { useState, useEffect, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import FormContainer from 'components/FormContainer';
import TitlePage from 'components/TitlePage';
import Table from 'components/Table';
import Filter from 'components/Filter';
import Modal from 'components/Modal';
import Input from 'components/Input';
import Select from 'components/Select';
import Pagination from 'components/Pagination';
import Button from 'components/Button';
import LoadingLogo from 'components/LoadingLogo';
import * as S from './style';

const ManageUsers = () => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalUserEvents, setModalUserEvents] = useState(false);
  const [userEventsData, setUserEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_LIMIT = 20;

  const onSearch = async (filters) => {
    setFilterValues(filters);
    getUsers({ ...filters });
  }
  
  const getUsers = async (filter) => {
    try {
      setLoading(true);
  
      let queryParams = '';
  
      if (filter.name) queryParams += `name=${filter.name}`;
      if (filter.email) queryParams += `&email=${filter.email}`;
      if (filter.phoneNumber) queryParams += `&phoneNumber=${filter.phoneNumber}`;
     
      queryParams += `&page=${page}`;
      queryParams += `&limit=${PAGE_LIMIT}`;
      
      const { data } = await apiService.get(`/admin/users?${queryParams}`);
  
      if (data.users) {
        const tableData = data.users.map((user) => ({
          id: user.id,
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
          status: user.status,
          active: user.active ? 'Sim' : 'Não',
          phoneNumber: user.phoneNumber,
          createdAt: ApplicationUtils.formatDate(user.createdAt),
        }));
  
        setTableData(tableData);
        setTotalPages(Math.ceil(data.total / PAGE_LIMIT));
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        type: 'error',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar informações do evento.'),
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getUserData = async (id) => {
    try {
      const { data } = await apiService.get(`/admin/users/${id}`);
      if (data.user) {
        setUserData(data.user);
        setModalUpdateUser(true);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        type: 'error',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar informações do evento.'),
      });
    }
  };

  const getUserEventData = async (id) => {
    try {
      const { data } = await apiService.get(`/admin/user-events/${id}`);
      if (data.events) {
        setModalUserEvents(true);
        setUserEventsData(data.events);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        type: 'error',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar informações do evento.'),
      });
    }
  };

  useEffect(() => {
    getUsers(page);
  }, [page]);
  
  return (
    <Container>
      <TitlePage title="Usuários" icon="fa-solid fa-users" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { name: 'name', label: 'Nome' },
              { name: 'email', label: 'E-mail' },
              { name: 'phoneNumber', label: 'Telefone' },
            ]}
            filterValues={filterValues}
            onSearch={onSearch}
            isLoading={loading}
          />
        </S.WrapperFilter>

        <Table
          data={tableData}
          columns={[
            { label: 'ID', name: 'id' },
            { label: 'Nome', name: 'name' },
            { label: 'E-mail', name: 'email' },
            { label: 'Tel.:', name: 'phoneNumber' },
            { label: 'Data de cadastro', name: 'createdAt' },
            { label: 'Ativo', name: 'active' },
          ]}
          actions={[
            {
              label: 'Eventos do usuário ',
              onClick: (row) => getUserEventData(row.id),
            },
            {
              label: 'Editar informações',
              onClick: (row) => getUserData(row.id),
            },
          ]}
        />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />
      </S.Content>

      {/* Modal View Events  */}
      <Modal active={modalUserEvents} updateShow={() => setModalUserEvents(false)}>
        <S.TitleModal>
          <i className="fa-solid fa-calendar"></i>
          Eventos do usuário
        </S.TitleModal>

        <FormContainer>
          {userEventsData.map((event, index) => (
            <S.Card key={index}>
              <S.CardIcon>
                <i className="fa-solid fa-calendar-day"></i> {/* Ícone do evento */}
              </S.CardIcon>
              <S.CardContent>
                <S.CardTitle>{event.title}</S.CardTitle>
                <S.CardSubtitle>{event.subtitle}</S.CardSubtitle>
                <S.CardDetails>
                  <div>
                    <strong>Data criação: </strong>
                    {ApplicationUtils.formatDate(event.createdAt)}
                  </div>
                  <div>
                    <strong>Localização: </strong>
                    {event.location}
                  </div>
                  <div>
                    <strong>Descrição: </strong>
                    {event.description}
                  </div>
                </S.CardDetails>
              </S.CardContent>
            </S.Card>
          ))}
        </FormContainer>
      </Modal>

      {/* Modal update  */}
      <Modal
        active={modalUpdateUser}
        updateShow={() => setModalUpdateUser(false)}
        closeOut={false}
      >
        <S.TitleModal>
          <i className="fa-solid fa-user-pen"></i>
          Editar usuário
        </S.TitleModal>

        <FormContainer>
          <Input
            label="Nome"
            value={userData.firstName}
            onChange={(value) => setUserData({ ...userData, firstName: value })}
          />
          <Input
            label="Sobrenome"
            value={userData.lastName}
            onChange={(value) => setUserData({ ...userData, lastName: value })}
          />
          <Input
            label="Email"
            value={userData.email}
            onChange={(value) => setUserData({ ...userData, email: value })}
          />
          <Input
            label="Número de telefone"
            value={userData.phoneNumber}
            onChange={(value) => setUserData({ ...userData, phoneNumber: value })}
          />
          <Select
            label="Ativo"
            data={[ { title: 'Ativo', value: 1 }, { title: 'Desativo', value: 0 } ]}
            value={userData.active}
            onChange={(value) => setUserData({ ...userData, active: value })}
          />
          <Button text="Salvar" />
        </FormContainer>
      </Modal>

      {loading && <LoadingLogo />}
    </Container>
  );
};

export default ManageUsers;