import { useState, useContext } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { GuestsContext } from 'contexts/Guests';
import Container from 'components/Container';
import GallerySlider from 'components/GallerySlider';
import WaveEffect from 'components/WaveEffect';
import Button from 'components/Button';
import Input from 'components/Input';
import Modal from 'components/Modal';
import logo from 'assets/logo-2.png';
import * as S from './style';

const Home = () => {
  const { apiService, setAlert, event } = useContext(GuestsContext);

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

  // state
  const [log, setLog] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [urlMap, setUrlMap] = useState(null);
  const [modalFormMessage, setModalFormMessage] = useState(false);
  const [modalFormConfirmation, setModalFormConfirmation] = useState(false);
  const [dataMessage, setDataMessage] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [dataConfirmation, setDataConfirmation] = useState({
    ...dataMessage,
    phoneNumber: '',
  });

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d{1,4})/, '$1-$2')
      .substring(0, 15);
  };

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
    <S.Main>
      {event && (
        <>
          <S.Header>
            <Container>
              <S.Nav>
                <S.MenuButton onClick={() => setIsOpen(!isOpen)}>
                  <i className="fa-solid fa-bars" />
                </S.MenuButton>
                <S.Logo>
                  <img src={logo} alt="Mimon" />
                </S.Logo>
              </S.Nav>

              <S.SideMenu className={`${isOpen ? 'open' : ''}`}>
                <ul>
                  <li>
                    <a href="/">Início</a>
                  </li>
                  <li>
                    <a href="/presentes">Lista de Presentes</a>
                  </li>
                  <li>
                    <a href="/confirmar">Confirmação</a>
                  </li>
                  <li>
                    <a href="/mensagens">Recadinhos</a>
                  </li>
                </ul>
              </S.SideMenu>
            </Container>
          </S.Header>

          <S.Background src="https://painel.mimon.com.br/assets/images/capa-debutante.jpg" />

          <Container>
            <S.WrapperProfile>
              <S.Avatar>
                <img
                  src="https://painel.mimon.com.br/assets/images/debutante-roxo-2.png"
                  alt="Imagem de perfil"
                />
              </S.Avatar>
              <S.EventTitle>
                <h1 style={{ color: event?.color }}>{event.title}</h1>
                <h2>{event.subtitle}</h2>
              </S.EventTitle>
            </S.WrapperProfile>
          </Container>

          <S.SectionIntroduction>
            <Container>
              <div className="content">
                <article>
                  <S.TitleSection style={{ color: event.color, textAlign: 'start' }}>
                    {event.titleDescription}
                  </S.TitleSection>
                  <p dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br />') }} />
                </article>
                <div className="gallery">
                  <GallerySlider gallery={event.gallery} options={{ loop: true }} />
                </div>
              </div>
            </Container>
          </S.SectionIntroduction>

          <S.SectionGifts>
            <Container>
              <S.TitleSection style={{ color: event?.color }}>
                Lista de Presentes
              </S.TitleSection>
              <div className="content">
                {event.gifts.map((item) => (
                  <article className="gift" key={item.id}>
                    <img src={item.imageUrl} alt={`Imagem ilustrativa do presente ${item.name}`} />
                    <h3 className="title">{item.name}</h3>
                    <p className="price">{ApplicationUtils.formatPrice(item.price)}</p>
                    <button style={{ background: event?.color }}>
                      PRESENTEAR
                    </button>
                  </article>
                ))}
              </div>
            </Container>
          </S.SectionGifts>

          <S.SectionMessage>
            <Container>
              <div style={{ marginBottom: -2 }}>
                <WaveEffect color={event.color} />
              </div>

              <div className="content" style={{ background: event.color }}>
                <div>
                  <S.TitleSection>Recados dos Convidados</S.TitleSection>
                  <p>Deixe uma mensagem especial</p>
                </div>
                <span className="fa-regular fa-envelope icon" />
                <Button
                  text="ENVIAR RECADO"
                  background="#FFFFFF"
                  color={event.color}
                  onClick={() => setModalFormMessage(true)}
                />
              </div>

              <div style={{ marginTop: -2 }}>
                <WaveEffect color={event.color} inverted={true} />
              </div>
            </Container>
          </S.SectionMessage>

          <S.SectionInfo>
            <Container>
              <S.TitleSection style={{ color: event.color }}>
                Informações do Evento
              </S.TitleSection>
              <div className="content" style={{ color: event.color }}>
                <div className="text-info">
                  <span className="fa-regular fa-calendar"></span>
                  <p>
                    {event.details.eventDate
                      ? ApplicationUtils.formatDate(event.details.eventDate, false)
                      : "A definir"}
                  </p>
                </div>

                <div className="text-info">
                  <span className="fa-regular fa-clock"></span>
                  <p>
                    {event.details.startTime && event.details.endTime
                      ? `${ApplicationUtils.formatToInputTime(event.details.startTime)} às ${ApplicationUtils.formatToInputTime(event.details.endTime)}`
                      : "A definir"}
                  </p>
                </div>

                {event.details.eventType === 'virtual' && (
                  <div className="text-info">
                    <span className="fa-solid fa-wifi" style={{ fontSize: 32 }} />
                    <div>
                      <strong>{event.details.transmission}</strong>
                      <p>Link:{" "}
                        <a href={event.details.transmissionLink}>
                          {event.details.transmissionLink}
                        </a>
                      </p>
                      <p>Senha: {event.details.transmissionPassword}</p>
                    </div>
                  </div>
                )}

                {event.details.eventType === 'in-person' && (
                  <>
                    <div className="text-info">
                      <span className="fa-solid fa-location-dot"></span>
                      <div>
                        <p>{event.details.fullAddress}</p>
                        <p>Cep: {event.details.postalCode}</p>
                        <p>Local do evento: {event.details.eventLocation}</p>
                      </div>
                    </div>

                    <iframe
                      width="100%"
                      height="350"
                      src={urlMap}
                      style={{ border: 'none' }}
                      title="mapa"
                    />
                  </>
                )}
              </div>
            </Container>
          </S.SectionInfo>

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
                />
              </div>

              <div style={{ marginTop: -2 }}>
                <WaveEffect color={event.color} inverted={true} />
              </div>
            </Container>
          </S.SectionConfirmation>

          <S.Footer style={{ background: event.color }}>
            <Container>
              <small>
                <i className="fa-solid fa-lock"></i> Ambiente seguro
              </small>{' '}
              <br />
              <small> © Mimon. Todos os direitos reservados.</small>
              <small style={{ display: 'block', marginTop: -4 }}>
                CNPJ - 17.624.249/0001-70
              </small>
            </Container>
          </S.Footer>
        </>
      )}

      {/* Modal Message */}
      <Modal
        active={modalFormMessage}
        updateShow={() => setModalFormMessage(false)}
        background="#fff"
        color="#000"
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
            background={event.color}
            onClick={sendMessage}
            isLoading={loading}
          />
        </S.WrapperForm>
      </Modal>

      {/* Modal Confirmation */}
      <Modal
        active={modalFormConfirmation}
        updateShow={() => setModalFormConfirmation(false)}
        background="#fff"
        color="#000"
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
          />
        </S.WrapperForm>
      </Modal>
    </S.Main>
  );
};

export default Home;
