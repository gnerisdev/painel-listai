import { useState, useContext, useEffect } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import NotFoundData from 'components/NotFoundData';
import ConfirmAction from 'components/ConfirmAction';
import * as S from './style';

const Confirmations = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [guests, setGuests] = useState([]);
  const [data, setData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', companions: [] });
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

  const deleteGuest = async (guestId) => {
    setLoading(true);
    try {
      await apiService.delete(`/users/guests/${event.id}/${guestId}`);
      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Convidado removido com sucesso.',
      });
      await getConfirmations();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao remover convidado.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newLog = { ...log };
    let errorCount = 0;
    let companionErrorMessages = [];

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

    data.companions.forEach((companion, index) => {
      if (companion.name.trim() && !companion.age) {
        companionErrorMessages.push(`* Idade do acompanhante ${index + 1} é obrigatória se o nome for preenchido.`);
        errorCount++;
      }
      if (companion.age && !companion.name.trim()) {
        companionErrorMessages.push(`* Nome do acompanhante ${index + 1} é obrigatório se a idade for preenchida.`);
        errorCount++;
      }
    });

    setLog(newLog);

    if (companionErrorMessages.length > 0) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: "fa-solid fa-triangle-exclamation",
        text: companionErrorMessages.join('\n'),
      });
    }

    return errorCount === 0;
  };

  const getConfirmations = async () => {
    try {
      const response = await apiService.get(`/users/guests/${event.id}`);
      const { success, guests, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao carregar convidados.');
      if (guests) {
        setGuests(guests.map(guest => ({
          ...guest })));
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao carregar convidados.'),
      });
    }
  };

  const sendConfirmation = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const payloadCompanions = data.companions.filter(c => c.name.trim() || c.age);

      if (editId) {
        await apiService.put(`/users/guests/${event.id}/${editId}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companions: payloadCompanions,
        });

        setAlert({
          show: true,
          title: 'Sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Convidado atualizado com sucesso.',
        });
      } else {
        await apiService.post(`/users/guests/${event.id}`, {
          eventId: event.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companions: payloadCompanions,
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
        companions: [],
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

  const addCompanionField = () => {
    setData(prev => ({
      ...prev,
      companions: [...prev.companions, { name: '', age: '' }]
    }));
  };

  const removeCompanionField = (index) => {
    setData(prev => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index)
    }));
  };

  const handleCompanionChange = (index, field, value) => {
    setData(prev => {
      const newCompanions = [...prev.companions];
      newCompanions[index] = { ...newCompanions[index], [field]: value };
      return { ...prev, companions: newCompanions };
    });
  };

  useEffect(() => {
    getConfirmations();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <TitlePage title="Lista de Presença" align="center" />

        <S.Content>
          <S.ButtonGroup>
            <Button
              text="NOVO CONVIDADO"
              background={color}
              onClick={() => {
                setData({ firstName: '', lastName: '', email: '', phoneNumber: '', companions: [] });
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

          <NotFoundData
            active={guests.length === 0}
            text="Nenhum convidado confirmou presença até agora."
            icon="fa-solid fa-user-xmark"
          />
          
          {guests.map((item) => (
            <S.GuestCard key={item.id}>
              <S.GuestInfo>
                <strong>
                  {item.firstName} {item.lastName}
                </strong>
                <div>{item.email}</div>
                <div>{item.phoneNumber}</div>
                {item.companions && item.companions.length > 0 && (
                  <div>
                    <strong>Acompanhantes:</strong> <br />
                    {item.companions.map((comp, idx) => (
                      <S.Tag key={idx} style={{ background: color, margin: '4px 4px 4px 0' }}>
                        {comp.name} ({comp.age} anos)
                      </S.Tag>
                    ))}
                  </div>
                )}
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
                      companions: item.companions || [],
                    });
                    setEditId(item.id);
                    setModal(true);
                  }}
                />
                <ConfirmAction
                  text="Tem certeza que deseja excluir este convidado?"
                  onConfirm={() => deleteGuest(item.id)}
                >
                  <S.ButtonIcon
                    style={{ background: color }}
                    className="fa-solid fa-trash"
                    onClick={() => {}}
                  />
                </ConfirmAction>
              </S.ActionButtons>
            </S.GuestCard>
          ))}
        </S.Content>
      </Container>

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

          {data.companions.map((companion, index) => (
            <S.WrapperCompanions key={index}>
              <h4>Acompanhante {index + 1}</h4>
              <div className="content">
                <Input
                  label={`Nome`}
                  value={companion.name}
                  onChange={(value) => handleCompanionChange(index, 'name', value)}
                />
                <Input
                  label={`Idade`}
                  type="number"
                  value={companion.age}
                  onChange={(value) => handleCompanionChange(index, 'age', value)}
                />
                <span 
                  id="btn-remove"
                  className="fa-solid fa-xmark" 
                  onClick={() => removeCompanionField(index)} 
                />
              </div>
            </S.WrapperCompanions>
          ))}

          <Button
            text="Add Acompanhante"
            onClick={addCompanionField}
            background="var(--secondary-color)"
            color="#FFFFFF"
            maxWidth={200}
            margin="0 auto 16px 0"
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
