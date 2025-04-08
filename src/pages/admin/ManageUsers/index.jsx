import { useState, useEffect, useContext } from 'react';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Header from 'components/Header';
import Table from 'components/Table';
import Filter from 'components/Filter';
import * as S from './style';
import Modal from 'components/Modal';
import Input from 'components/Input';
import FormContainer from 'components/FormContainer';
import Select from 'components/Select';
import Button from 'components/Button';
import CardTitle from 'components/CardTitle';

const ManageUsers = () => {
  const { apiService, setAlert } = useContext(AdminContext);
  const [tableData, setTableData] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [modalUserEvents, setModalUserEvents] = useState(false);
  const [userEventsData, setUserEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  
  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
    status: '',
  });

  const onSearch = async (data) => {
    console.log(data);
  };

  const getUsers = async () => {
    try {
      const { data } = await apiService.get(`/admin/users`);
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
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        type: 'error',
        text: ApplicationUtils.getErrorMessage(
          error,
          'Erro ao recuperar informações do evento.',
        ),
      });
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
        text: ApplicationUtils.getErrorMessage(
          error,
          'Erro ao recuperar informações do evento.',
        ),
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
        text: ApplicationUtils.getErrorMessage(
          error,
          'Erro ao recuperar informações do evento.',
        ),
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) return <div>loading....</div>;

  return (
    <Container>
      <Header />
      <TitlePage title="Usuários" icon="fa-solid fa-users" />

      <S.Content>
        <S.WrapperFilter>
          <Filter
            fields={[
              { name: 'name', label: 'Nome' },
              { name: 'email', label: 'E-mail' },
              { name: 'Telefone', label: 'Telefone' },
            ]}
            filterValues={filterValues}
            onSearch={onSearch}
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
      </S.Content>

      {/* Modal View Events  */}
      <Modal
        active={modalUserEvents}
        updateShow={() => setModalUserEvents(false)}
        background="#fff"
        color="#000"
      >
        <S.TitleModal>
          <i className="fa-solid fa-calendar"></i>
          Eventos usuário
        </S.TitleModal>

        <S.WrapperForm>
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
                    <strong>Data: </strong>
                    {ApplicationUtils.formatDate(event.date)}
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
        </S.WrapperForm>
      </Modal>

      {/* Modal update  */}
      <Modal
        active={modalUpdateUser}
        updateShow={() => setModalUpdateUser(false)}
        background="#fff"
        color="#000"
      >
        <S.TitleModal>
          <i class="fa-solid fa-user-pen"></i>
          Editar usuário
        </S.TitleModal>

        <S.WrapperForm>
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
            onChange={(value) =>
              setUserData({ ...userData, phoneNumber: value })
            }
          />
          <Select
            label="Ativo"
            data={[
              { title: 'Ativo', value: 1 },
              { title: 'Desativo', value: 0 },
            ]}
            value={userData.active}
            onChange={(value) => setUserData({ ...userData, active: value })}
          />
          <Button text="Salvar" />
        </S.WrapperForm>
      </Modal>
    </Container>
  );
};

export default ManageUsers;