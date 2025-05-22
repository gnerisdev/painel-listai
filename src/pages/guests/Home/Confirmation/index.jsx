import { useState, useContext } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { GuestsContext } from 'contexts/Guests';
import Container from 'components/Container';
import WaveEffect from 'components/WaveEffect';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import * as S from './style';

const Confirmation = ({ event }) => {
  const { apiService, setAlert } = useContext(GuestsContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormConfirmation, setModalFormConfirmation] = useState(false);
  const [dataConfirmation, setDataConfirmation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '', 
    phoneNumber: '',
  });

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .substring(0, 15);
  };

  const validateFormConfirmation = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!dataConfirmation.firstName.trim()) {
      newLog.firstName = '* Nome obrigatório';
      errorCount++;
    } else {
      newLog.firstName = '';
    }

    if (!dataConfirmation.lastName.trim()) {
      newLog.lastName = '* Sobrenome obrigatório';
      errorCount++;
    } else {
      newLog.lastName = '';
    }

    if (!dataConfirmation.email.trim()) {
      newLog.email = '* E-mail obrigatório';
      errorCount++;
    } else if (!emailRegex.test(dataConfirmation.email)) {
      newLog.email = '* E-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!dataConfirmation.phoneNumber.trim()) {
      newLog.phoneNumber = '* Telefone obrigatório';
      errorCount++;
    } else if (!phoneRegex.test(dataConfirmation.phoneNumber)) {
      newLog.phoneNumber = '* Telefone inválido';
      errorCount++;
    } else {
      newLog.phoneNumber = '';
    }

    setLog(newLog);
    return errorCount === 0;
  };

  const sendConfirmation = async () => {
    try {
      if (!validateFormConfirmation()) return;

      setLoading(true);

      const response = await apiService.post(`/guests/confirmation/${event.id}`, dataConfirmation);
      const { success, message } = response?.data;

      if (!success) throw new Error(message || 'Erro ao confirmar presença.');

      setModalFormConfirmation(false);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Presença confirmada.',
        icon: 'fa-solid fa-check',
      });

      setDataConfirmation({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao confirmar presença.'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <S.SectionConfirmation>
        <Container>
          <div style={{ marginBottom: -2 }}>
            <WaveEffect color={event.color} />
          </div>

          <div className="content" style={{ background: event.color }}>
            <div>
              <S.TitleSection>Contamos com a sua presença</S.TitleSection>
            </div>
            <span className="fa-regular fa-calendar-check icon" />
            <Button
              onClick={() => setModalFormConfirmation(true)}
              text="Confirmar presença"
              background="#FFFFFF"
              color={event.color}
              maxWidth={300}
            />
          </div>

          <div style={{ marginTop: -2 }}>
            <WaveEffect color={event.color} inverted={true} />
          </div>
        </Container>
      </S.SectionConfirmation>

      <Modal
        active={modalFormConfirmation}
        updateShow={() => setModalFormConfirmation(false)}
        closeOut={false}
      >
        <S.TitleSection style={{ color: event.color }}>
          <i className="fa-solid fa-check"></i>
          {'  '}Confirme sua presença
        </S.TitleSection>

        <S.WrapperForm>
          <div style={{ display: 'flex', gap: 16 }}>
            <Input
              label="Nome"
              value={dataConfirmation.firstName}
              check={log.firstName === ''}
              messageError={log.firstName}
              onChange={(value) => {
                setDataConfirmation({ ...dataConfirmation, firstName: value });
                value === ''
                  ? setLog({ ...log, firstName: '* Campo obrigatório' })
                  : setLog({ ...log, firstName: '' });
              }}
            />

            <Input
              label="Sobrenome"
              value={dataConfirmation.lastName}
              check={log.lastName === ''}
              messageError={log.lastName}
              onChange={(value) => {
                setDataConfirmation({ ...dataConfirmation, lastName: value });
                value === ''
                  ? setLog({ ...log, lastName: '* Campo obrigatório' })
                  : setLog({ ...log, lastName: '' });
              }}
            />
          </div>

          <Input
            label="E-mail"
            type="email"
            value={dataConfirmation.email}
            messageError={log.email}
            check={log.email === ''}
            onChange={(value) => {
              setDataConfirmation({ ...dataConfirmation, email: value });
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
            value={dataConfirmation.phoneNumber}
            messageError={log.phoneNumber}
            check={log.phoneNumber === ''}
            onChange={(value) => {
              setDataConfirmation({ ...dataConfirmation, phoneNumber: formatPhone(value) });
              if (!phoneRegex.test(formatPhone(value))) {
                setLog({ ...log, phoneNumber: '* Número inválido' });
                return;
              }
              setLog({ ...log, phoneNumber: '' });
            }}
          />

          <Button
            text="CONFIRMAR PRESENÇA"
            color="#FFFFFF"
            background={event.color}
            onClick={sendConfirmation}
            isLoading={loading}
            maxWidth={300}
          />
        </S.WrapperForm>
      </Modal>
    </>
  );
};

export default Confirmation;
