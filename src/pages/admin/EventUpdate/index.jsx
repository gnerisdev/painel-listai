import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Input from 'components/Input';
import FormContainer from 'components/FormContainer';
import Select from 'components/Select';
import Button from 'components/Button';
import InputUrl from 'components/InputUrl';
import SelectColor from 'components/SelectColor';
import * as S from './style';

const EventUpdate = () => {
  const { id } = useParams();
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [log, setLog] = useState({});
  const [event, setEvent] = useState({
    id: null,
    active: false,
    color: '#ff779d',
    createdAt: '',
    description: '',
    details: {},
    eventCategoryId: '',
    slug: '',
    subtitle: '',
    title: '',
    titleDescription: '',
    updatedAt: '',
  });
  const [details, setDetails] = useState({
    id: null,
    eventId: '',
    createdAt: '',
    updatedAt: '',
    eventDate: '',
    eventLocation: '',
    eventType: 'in-person',
    fullAddress: '',
    latitude: '',
    longitude: '',
    postalCode: '',
    startTime: '',
    endTime: '',
    transmission: '',
    transmissionLink: '',
    transmissionPassword: '',
  });

  const eventType = [
    { title: 'Prensencial', value: 'in-person' },
    { title: 'Virtual', value: 'virtual' },
  ];

  const validateFields = () => {
    const errors = {};
    if (!event.title) errors.title = '* Campo obrigatório';
    if (!event.subtitle) errors.subtitle = '* Campo obrigatório';
    if (!event.slug) errors.slug = '* Campo obrigatório';
    if (!details.eventDate) errors.eventDate = '* Campo obrigatório';
    if (details.eventType === 'in-person') {
      if (!details.eventLocation) errors.eventLocation = '* Campo obrigatório';
      if (!details.fullAddress) errors.fullAddress = '* Campo obrigatório';
    } else if (details.eventType === 'virtual') {
      if (!details.transmission) errors.transmission = '* Campo obrigatório';
      if (!details.transmissionLink) errors.transmissionLink = '* Campo obrigatório';
    }
    if (!details.startTime) errors.startTime = '* Campo obrigatório';
    if (!details.endTime) errors.endTime = '* Campo obrigatório';
    return errors;
  };

  const save = async () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setLog(validationErrors);
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-exclamation-triangle',
        text: 'Por favor, preencha todos os campos obrigatórios.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.put(`/admin/events/${id}`, { ...event, details: details });
      const { success, message } = response.data;
      if (!success) throw new Error(message || 'Erro ao atualizar o evento.');

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check-circle',
        text: 'Evento atualizado com sucesso!',
      });
      getEventDetails();
      setDisabled(true);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao atualizar o evento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const getEventDetails = async () => {
    try {
      const response = await apiService.get(`/admin/events/${id}`);
      const { success, message, event } = response.data;
      if (!success || !event) throw new Error(message);

      setEvent(event);
      if (event.details) setDetails(event.details);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar informações do evento.'),
      });
    }
  };

  const changeDetails = (name, value) => {
    setDetails({ ...details,  [name]: value });
    value === ''
      ? setLog({ ...log, [name]: '* Campo obrigatório' })
      : setLog({ ...log, [name]: '' });
  }

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <Container>
      <TitlePage title="Evento" icon="fa-solid fa-calendar-days" />

      <FormContainer margin="56px auto">
        <S.WrapperFloat>
          <h2>Informações</h2>
          <Button
            maxWidth='200px'
            text={`${disabled
              ? "<i className='fa-solid fa-pen'></i> Editar"
              : "<i className='fa-regular fa-eye'></i> Visualizar"
              }`}
            onClick={() => setDisabled(!disabled)}
          />
        </S.WrapperFloat>

        <Input
          disabled={disabled}
          label="Título"
          value={event.title}
          onChange={(value) => setEvent({ ...event, title: value })}
        />

        <Input
          disabled={disabled}
          label="Subtítulo"
          value={event.subtitle}
          onChange={(value) => setEvent({ ...event, subtitle: value })}
        />

        <InputUrl
          disabled={disabled}
          label="URL - Link do evento"
          url="https://sites.listai.com.br/"
          messageError={log.slug}
          check={log.slug === ''}
          value={event.slug}
          onChange={(value) => {
            setEvent({ ...event, slug: value });
            value === ''
              ? setLog({ ...log, slug: '* O link está em uso, por favor, crie outro' })
              : setLog({ ...log, slug: '' });
          }}
        />

        <Select
          disabled={disabled}
          label="Ativo"
          data={[{ title: 'Ativo', value: true }, { title: 'Desativo', value: false }]}
          value={event.active}
          onChange={(value) => setEvent({ ...event, active: value })}
        />

        <Input
          disabled={disabled}
          label="Título da Introdução"
          value={event.titleDescription || ''}
          check={log.titleDescription === ''}
          messageError={log.titleDescription}
          onChange={(value) => setEvent({ ...event, titleDescription: value })}
        />

        <Input
          disabled={disabled}
          label="Introdução"
          type="textarea"
          value={event.description || ''}
          check={log.description === ''}
          messageError={log.description}
          onChange={(value) => setEvent({ ...event, description: value })}
        />

        <SelectColor
          label="Selecione uma cor"
          selected={event.color || []}
          getData={(value) => setEvent({ ...event, color: value })}
          messageError={log.color}
        />

        <br /> <h2>Detalhes</h2>
        <Input
          label="Data do evento"
          type="date"
          disabled={disabled}
          value={details.eventDate}
          check={log.eventDate === ''}
          messageError={log.eventDate}
          onChange={(value) => changeDetails('eventDate', value)}
        />

        <S.Row>
          <Input
            disabled={disabled}
            label="Horário de início"
            type="time"
            value={details.startTime}
            check={log.startTime === ''}
            messageError={log.startTime}
            onChange={(value) => changeDetails('startTime', value)}
          />
          <Input
            disabled={disabled}
            label="Horário de término"
            type="time"
            value={details.endTime}
            check={log.endTime === ''}
            messageError={log.endTime}
            onChange={(value) => changeDetails('endTime', value)}
          />
        </S.Row>

        <Select
          disabled={disabled}
          label="Tipo do evento"
          data={eventType}
          value={details.eventType}
          messageError={log.eventType}
          check={log.eventType === ''}
          onChange={(value) => changeDetails('eventType', value)}
        />

        {/* Presencial */}
        {details?.eventType === 'in-person' && (
          <>
            <Input
              disabled={disabled}
              label="Local do Evento"
              placeholder="Ex.: Nome do Buffet, Minha Casa"
              value={details.eventLocation}
              check={log.eventLocation === ''}
              messageError={log.eventLocation}
              onChange={(value) => changeDetails('eventLocation', value)}
            />

            <Input
              disabled={disabled}
              label="Cep"
              placeholder="CEP"
              value={details.postalCode}
              onChange={(value) => changeDetails('postalCode', value)}
            />

            <Input
              disabled={disabled}
              label="Endereço"
              placeholder="Endereço completo ou local"
              value={details.fullAddress}
              check={log.fullAddress === ''}
              messageError={log.fullAddress}
              onChange={(value) => changeDetails('fullAddress', value)}
            />
          </>
        )}

        {/* Virtual */}
        {details?.eventType === 'virtual' && (
          <>
            <Input
              disabled={disabled}
              label="Por onde será feita a transmissão"
              placeholder="Ex.: Google Meet, Zoom, Whereby"
              value={details.transmission}
              check={log.transmission === ''}
              messageError={log.transmission}
              onChange={(value) => changeDetails('transmission', value)}
            />

            <Input
              disabled={disabled}
              label="Link da transmissão"
              placeholder="Cole aqui o link gerado da sua conferência!"
              value={details.transmissionLink}
              check={log.transmissionLink === ''}
              messageError={log.transmissionLink}
              onChange={(value) => changeDetails('transmissionLink', value)}
            />

            <Input
              disabled={disabled}
              label="Senha da transmissão"
              placeholder="Cole aqui a senha (caso exista)"
              value={details.transmissionPassword}
              check={log.transmissionPassword === ''}
              messageError={log.transmissionPassword}
              onChange={(value) => changeDetails('transmissionPassword', value)}
            />
          </>
        )}

        {!disabled && <Button onClick={save} isLoading={loading} text="Salvar" />}
      </FormContainer>
    </Container>
  );
};

export default EventUpdate;
