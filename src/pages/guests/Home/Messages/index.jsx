import { useState } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { useGuests } from 'contexts/Guests';
import Container from 'components/Container';
import WaveEffect from 'components/WaveEffect';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import * as S from './style';

const Messages = ({ event }) => {
  const { apiService, setAlert } = useGuests();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalFormMessage, setModalFormMessage] = useState(false);
  const [dataMessage, setDataMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });

  const validateFormMessage = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!dataMessage.firstName.trim()) {
      newLog.firstName = '* Nome obrigatório';
      errorCount++;
    } else {
      newLog.firstName = '';
    }

    if (!dataMessage.lastName.trim()) {
      newLog.lastName = '* Sobrenome obrigatório';
      errorCount++;
    } else {
      newLog.lastName = '';
    }

    if (!dataMessage.email.trim()) {
      newLog.email = '* E-mail obrigatório';
      errorCount++;
    } else if (!emailRegex.test(dataMessage.email)) {
      newLog.email = '* E-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!dataMessage.message.trim()) {
      newLog.message = '* Mensagem obrigatória';
      errorCount++;
    } else {
      newLog.message = '';
    }

    setLog(newLog);
    return errorCount === 0;
  };

  const sendMessage = async () => {
    try {
      if (!validateFormMessage()) return;

      setLoading(true);

      const response = await apiService.post(`/guests/message/${event.id}`, dataMessage);
      const { success, message } = response?.data;

      if (!success) throw new Error(message || 'Erro ao enviar mensagem.');

      setModalFormMessage(false);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Recado enviado.',
        icon: 'fa-solid fa-check',
      });

      setDataMessage({ firstName: '', lastName: '', email: '', message: '' });
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: "fa-solid fa-triangle-exclamation",
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao enviar recado.'),
      });
    } finally {
      setLoading(false);
    }
  };
  return (<>
    <S.SectionMessage id="messages">
      <Container>
        <div style={{ marginBottom: -2 }}>
          <WaveEffect color="var(--primary-color)" />
        </div>

        <div className="content" style={{ background: "var(--primary-color)" }}>
          <div>
            <S.TitleSection>Recados dos Convidados</S.TitleSection>
            <p>Deixe uma mensagem especial</p>
          </div>
          <span className="fa-regular fa-envelope icon" />
          <Button
            text="ENVIAR RECADO"
            background="#FFFFFF"
            color="var(--primary-color)"
            onClick={() => setModalFormMessage(true)}
            maxWidth={300}
          />
        </div>

        <div style={{ marginTop: -2 }}>
          <WaveEffect color="var(--primary-color)" inverted={true} />
        </div>
      </Container>
    </S.SectionMessage>

    <Modal
      active={modalFormMessage}
      updateShow={() => setModalFormMessage(false)}
      closeOut={false}
    >
      <S.TitleSection style={{ color: event.color }}>
        <i className="fa-regular fa-message"></i>
        {'  '}Deixe seu recado
      </S.TitleSection>

      <S.WrapperForm>
        <div style={{ display: 'flex', gap: 16 }}>
          <Input
            label="Nome"
            value={dataMessage.firstName}
            check={log.firstName === ''}
            messageError={log.firstName}
            onChange={(value) => {
              setDataMessage({ ...dataMessage, firstName: value });
              value === ''
                ? setLog({ ...log, firstName: '* Campo obrigatório' })
                : setLog({ ...log, firstName: '' });
            }}
          />

          <Input
            label="Sobrenome"
            value={dataMessage.lastName}
            check={log.lastName === ''}
            messageError={log.lastName}
            onChange={(value) => {
              setDataMessage({ ...dataMessage, lastName: value });
              value === ''
                ? setLog({ ...log, lastName: '* Campo obrigatório' })
                : setLog({ ...log, lastName: '' });
            }}
          />
        </div>

        <Input
          label="E-mail"
          type="email"
          value={dataMessage.email}
          messageError={log.email}
          check={log.email === ''}
          onChange={(value) => {
            setDataMessage({ ...dataMessage, email: value });
            if (!emailRegex.test(value)) {
              setLog({ ...log, email: '* E-mail inválido' });
              return;
            }
            setLog({ ...log, email: '' });
          }}
        />

        <Input
          label="Mensagem"
          type="textarea"
          value={dataMessage.message}
          check={log.message === ''}
          messageError={log.message}
          onChange={(value) => setDataMessage({ ...dataMessage, message: value })}
        />

        <Button
          text="ENVIAR RECADO"
          color="#FFFFFF"
          background="var(--primary-color)"
          onClick={sendMessage}
          isLoading={loading}
        />
      </S.WrapperForm>
    </Modal>
  </>
  );
};

export default Messages;
