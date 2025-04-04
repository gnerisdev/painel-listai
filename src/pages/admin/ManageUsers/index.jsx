/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
    status: '',
  });

  const onSearch = async (values) => {
      console.log('values', values);
  };

  const getUsers = async () => {
    try {
      const response = await apiService.get('/admin/userAll');

      // Verifica a estrutura correta da resposta
      if (response.data?.success && Array.isArray(response.data.data)) {
        const users = response.data.data;

        const tableData = users.map(user => ({
          id: user.id,
          email: user.email,
          // Corrige os nomes dos campos para snake_case
          name: `${user.first_name} ${user.last_name}`,
          // Adiciona verificação de campos opcionais
          active: user.active !== undefined ? (user.active ? 'Sim' : 'Não') : '-',
          phoneNumber: user.phone_number || '-',
          createdAt: ApplicationUtils.formatDate(user.created_at)
        }));

        setTableData(tableData);
      } else {
        throw new Error('Resposta da API inválida');
      }
    } catch (error) {
      // Tratamento de erro aprimorado
      setAlert({
        show: true,
        title: 'Erro na requisição',
        type: 'error',
        text: `Falha ao carregar usuários: ${ApplicationUtils.getErrorMessage(error)}`,
      });
    }
  };
  const resetSearch = () => {
    setSearchParams({
      name: '',
      email: '',
      phone: ''
    });

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
              {
                name: 'name',
                label: 'Nome',
                placeholder: 'Digite um nome...'
              },
              {
                name: 'email',
                label: 'E-mail',
                type: 'email'
              },
              {
                name: 'phone',
                label: 'Telefone',
                placeholder: '(00) 00000-0000'
              },
            ]}
            initialValues={searchParams}
            onClick={() => onSearch()}

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
