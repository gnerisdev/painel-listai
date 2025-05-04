import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AdminContext } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Header from 'components/Header';
import Input from 'components/Input';
import FormContainer from 'components/FormContainer';
import Select from 'components/Select';
import Button from 'components/Button';
import * as S from './style';
import InputUrl from 'components/InputUrl';
import SelectColor from 'components/SelectColor';

const EventUpdate = () => {
  const { id } = useParams();
  const { apiService, setAlert } = useContext(AdminContext);
  const [userEventsData, setUserEventsData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [log, setLog] = useState({});
  const [event, setEvent] = useState({
    id: null,
    active: false,
    color: '#ff779d',
    createdAt: '',
    description: '',
    details: {},
    eventCategoriesId: '',
    slug: '',
    subtitle: '',
    title: '',
    titleDescription: '',
    updatedAt: '',
  });
  const [details, setDetails] = useState({
    id: null,
    eventId: null,
    createdAt: '',
    updatedAt: '',
    eventDate: '',
    eventLocation: '',
    eventType: 'in-person',
    fullAddress: '',
    latitude: null,
    longitude: null,
    postalCode: null,
    startTime: null,
    transmission: null,
    transmissionLink: null,
    transmissionPassword: null,
  });

  const eventType = [
    { title: 'Prensencial', value: 'in-person' },
    { title: 'Virtual', value: 'virtual' },
  ];

  const getEventDetails = async () => {
    try {
      const { data } = await apiService.get(`/admin/event-details/${id}`);
      if (!data.success) throw new Error(data?.message);
      if (!data.event) {
        setAlert({
          show: true,
          title: 'Sem dados extra!',
          icon: 'fa-solid fa-circle-check',
        });
      } else if (data.event) {
        setEvent(data.event);
        if (data.details) setDetails(data.details);
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

  const save = async () => {
    try {
      const { data } = await apiService.get(`/admin/user-events/${id}`);
      if (data.events) {
        // setModalUserEvents(true);
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
    getEventDetails();
  }, []);

  return (
    <Container>
      <Header />
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
          url="https://sites.mimon.com.br/"
          messageError={log.slug}
          check={log.slug === ''}
          value={event.slug}
          onBlur={(value) => {
            setEvent({ ...event, slug: value });
            value === ''
              ? setLog({ ...log, slug: '* O link www.mimon.com.br/aaaaa está em uso, por favor, crie outro' })
              : setLog({ ...log, slug: '' });
          }}
        />

        <Select
          disabled={disabled}
          label="Ativo"
          data={[{ title: 'Ativo', value: 1 }, { title: 'Desativo', value: 0 }]}
          value={event.active}
          onChange={(value) => setEvent({ ...event, active: value })}
        />

        <Input
          disabled={disabled}
          label="Título da Introdução"
          value={event.titleDescription}
          check={log.titleDescription === ''}
          messageError={log.titleDescription}
          onChange={(value) => setEvent({ ...event, titleDescription: value })}
        />

        <Input
          disabled={disabled}
          label="Introdução"
          type="textarea"
          value={event.description}
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

        <S.Row>
          <Input
            disabled={disabled}
            label="Horário de início"
            type="time"
            value={details.startTime}
            check={log.startTime === ''}
            messageError={log.startTime}
            onChange={(value) => setDetails({ ...details, startTime: value })}
          />
          <Input
            disabled={disabled}
            label="Horário de término"
            type="time"
            value={details.endTime}
            check={log.endTime === ''}
            messageError={log.endTime}
            onChange={(value) => setDetails({ ...details, endTime: value })}
          />
        </S.Row>

        <Select
          disabled={disabled}
          label="Tipo do evento"
          messageError={details.eventType}
          data={eventType}
          value={details.eventType || ''}
          onChange={(value) => {
            setDetails({ ...details, eventType: value });
            value === ''
              ? setLog({ ...log, eventType: '* Campo obrigatório' })
              : setLog({ ...log, eventType: '' });
          }}
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
              onChange={(value) => setDetails({ ...details, eventLocation: value })}
            />

            <S.WrapperCep>
              <Input
                disabled={disabled}
                label="Cep"
                placeholder="CEP"
                value={details.postalCode}
                onChange={(value) => setDetails({ ...details, postalCode: value })}
              />
              <button
                type="button"
              // onClick={getCepAndGeoLocation}
              >
                <span className="fa-solid fa-magnifying-glass"></span>
              </button>
            </S.WrapperCep>

            <Input
              disabled={disabled}
              label="Endereço"
              placeholder="Endereço completo ou local"
              value={details.fullAddress}
              check={log.fullAddress === ''}
              messageError={log.fullAddress}
              onChange={(value) => setDetails({ ...details, fullAddress: value })}
            // onBlur={(value) => getGeolocation(value)}
            />

            {/* {(details.latitude && details.longitude) && (
                <iframe 
                  width="100%" 
                  height="350" 
                  src={urlMap}
                  style={{ border: 'none' }}
                  title="mapa"
                >
                </iframe>
              )} */}
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
              onChange={(value) => setDetails({ ...details, transmission: value })}
            />

            <Input
              disabled={disabled}
              label="Link da transmissão"
              placeholder="Cole aqui o link gerado da sua conferência!"
              value={details.transmissionLink}
              check={log.transmissionLink === ''}
              messageError={log.transmissionLink}
              onChange={(value) => setDetails({ ...details, transmissionLink: value })}
            />

            <Input
              disabled={disabled}
              label="Senha da transmissão"
              placeholder="Cole aqui a senha (caso exista)"
              value={details.transmissionPassword}
              check={log.transmissionPassword === ''}
              messageError={log.transmissionPassword}
              onChange={(value) => setDetails({ ...details, transmissionPassword: value })}
            />
          </>
        )}

        {!disabled && <Button text="Salvar" />}
      </FormContainer>
    </Container>
  );
};

export default EventUpdate;
