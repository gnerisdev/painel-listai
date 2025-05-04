import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import * as S from './style';

const Confirmations = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [guests, setGuests] = useState([]);
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [log, setLog] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  const color = event.color;

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .substring(0, 15);
  };

  const validateForm = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!data.firstName.trim()) {
      newLog.firstName = '* Nome obrigatório';
      errorCount++;
    } else {
      newLog.firstName = '';
    }

    if (!data.lastName.trim()) {
      newLog.lastName = '* Sobrenome obrigatório';
      errorCount++;
    } else {
      newLog.lastName = '';
    }

    if (!data.email.trim()) {
      newLog.email = '* E-mail obrigatório';
      errorCount++;
    } else if (!emailRegex.test(data.email)) {
      newLog.email = '* E-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!data.phoneNumber.trim()) {
      newLog.phoneNumber = '* Telefone obrigatório';
      errorCount++;
    } else if (!phoneRegex.test(data.phoneNumber)) {
      newLog.phoneNumber = '* Telefone inválido';
      errorCount++;
    } else {
      newLog.phoneNumber = '';
    }

    setLog(newLog);
    return errorCount === 0;
  };

  const getConfirmations = async () => {
    try {
      const response = await apiService.get(`/users/guests/${event.id}`);
      const { success, guests, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao confirmar presença.');
      if (guests) setGuests(guests);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao confirmar presença.'),
      });
    }
  };

  const sendConfirmation = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (editId) {
        // Update
        await apiService.put(`/users/guests/${event.id}/${editId}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });

        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Convidado atualizado com sucesso.',
        });
      } else {
        // Create
        await apiService.post(`/users/guests/${event.id}`, {
          eventId: event.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        });
        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Convidado adicionado com sucesso.',
        });
      }

      setModal(false);
      setData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      });
      setEditId(null);
      setLog({});

      await getConfirmations();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar convidado.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConfirmations();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <Header back={-1} background={color} />
        <TitlePage title="Lista de Presença" align="center" />

        <S.Content>
          <S.ButtonGroup>
            <Button
              text="NOVO CONVIDADO"
              background={color}
              onClick={() => {
                setData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
                setLog({});
                setEditId(null);
                setModal(true);
              }}
            />

            <Button
              text="BAIXAR LISTA"
              background="#c6c6c6"
              onClick={() => { }}
            />
          </S.ButtonGroup>

          <S.SectionTitle>Convidados Confirmados</S.SectionTitle>

          {guests.map((item) => (
            <S.GuestCard key={item.id}>
              <S.GuestInfo>
                <strong>
                  {item.firstName} {item.lastName}
                </strong>
                <div>{item.email}</div>
                <div>{item.phoneNumber}</div>
                <S.Tag style={{ background: color }}>CHILD-0-4</S.Tag>
              </S.GuestInfo>

              <S.ActionButtons>
                <S.ButtonIcon
                  style={{ background: color }}
                  className="fa-solid fa-pen"
                  onClick={() => {
                    setData({
                      firstName: item.firstName,
                      lastName: item.lastName,
                      email: item.email,
                      phoneNumber: item.phoneNumber,
                    });
                    setEditId(item.id);
                    setModal(true);
                  }}
                />
                <S.ButtonIcon
                  style={{ background: color }}
                  className="fa-solid fa-trash"
                // Aqui depois você pode implementar a exclusão
                />
              </S.ActionButtons>
            </S.GuestCard>
          ))}
        </S.Content>
      </Container>

      {/* Modal Confirmar */}
      <Modal
        active={modal}
        updateShow={() => setModal(false)}
        closeOut={false}
      >
        <h2 style={{ color }}>
          <span className="fa-solid fa-user" />
          {'  '}Convidado
        </h2>

        <S.ModalContent>
          <div className="row">
            <Input
              label="Nome"
              value={data.firstName}
              check={log.firstName === ''}
              messageError={log.firstName}
              onChange={(value) => {
                setData({ ...data, firstName: value });
                value === ''
                  ? setLog({ ...log, firstName: '* Campo obrigatório' })
                  : setLog({ ...log, firstName: '' });
              }}
            />

            <Input
              label="Sobrenome"
              value={data.lastName}
              check={log.lastName === ''}
              messageError={log.lastName}
              onChange={(value) => {
                setData({ ...data, lastName: value });
                value === ''
                  ? setLog({ ...log, lastName: '* Campo obrigatório' })
                  : setLog({ ...log, lastName: '' });
              }}
            />
          </div>

          <Input
            label="E-mail"
            type="email"
            value={data.email}
            messageError={log.email}
            check={log.email === ''}
            onChange={(value) => {
              setData({ ...data, email: value });
              if (!emailRegex.test(value)) {
                setLog({ ...log, email: '* E-mail inválido' });
                return;
              }
              setLog({ ...log, email: '' });
            }}
          />

          <Input
            label="Celular"
            type="tel"
            value={data.phoneNumber}
            messageError={log.phoneNumber}
            check={log.phoneNumber === ''}
            onChange={(value) => {
              setData({ ...data, phoneNumber: formatPhone(value) });
              if (!phoneRegex.test(formatPhone(value))) {
                setLog({ ...log, phoneNumber: '* Número inválido' });
                return;
              }
              setLog({ ...log, phoneNumber: '' });
            }}
          />

          <Button
            text={editId ? 'ATUALIZAR CONVIDADO' : 'SALVAR CONVIDADO'}
            color="#FFFFFF"
            background={event.color}
            onClick={sendConfirmation}
            isLoading={loading}
          />
        </S.ModalContent>
      </Modal>
    </main>
  );
};

export default Confirmations;
