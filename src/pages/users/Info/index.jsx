import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Select from 'components/Select';
import InputDate from 'components/InputDate';
import * as S from './style';

const Info = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState({});
  const [urlMap, setUrlMap] = useState(null);
  const [data, setData] = useState({
    eventDate: null,
    startTime: null,
    endTime: null,
    eventType: '',
    eventLocation: '',
    postalCode: '',
    fullAddress: '',
    latitude: '',
    longitude: '',
    transmission: '',
    transmissionLink: '',
    transmissionPassword: ''
  });

  const eventType = [
    { title: 'Presencial', value: 'in-person' },
    { title: 'Virtual', value: 'virtual' },
  ];

  const getCepAndGeoLocation = async () => {
    if (!data?.postalCode) return;

    try {
      const response = await apiService.externalQuery(
        `https://viacep.com.br/ws/${encodeURIComponent(data?.postalCode)}/json/`,
        'get', null, {},
      );

      if (!response.data.logradouro) {
        setAlert({
          show: true,
          title: 'Cep não encontrado!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: 'Não foi possível encontrar o cep'
        });

        setUrlMap(null);
      }
      
      const { uf, logradouro, bairro, localidade } = response.data;

      getGeolocation(`${logradouro}, ${bairro}, ${localidade}, ${uf}`);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const getGeolocation = async (fullAddress) => {
    if (!fullAddress) return;
    try {
      const response = await apiService.externalQuery(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
        'get', null, {}
      );

      const places = response.data;

      if (places.length > 0) {
        const { lat, lon, name } = places[0];
        setData({ ...data, latitude: lat, longitude: lon, fullAddress: name });
        const mapUrl = `/marker-map.html?lat=${lat}&lon=${lon}&color=${event.color}`;
        setUrlMap(mapUrl);
      }
    } catch (error) {
      console.error('Erro ao buscar localização:', error);
    }
  };

  const startMap = async (fullAddress) => {
    const response = await apiService.externalQuery(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`,
      'get', null, {}
    );

    const places = response.data;
    if (!places || places.length <= 0) return;
     
    const { lat, lon } = places[0];
    const mapUrl = `/marker-map.html?lat=${lat}&lon=${lon}`;
    setUrlMap(mapUrl);
  };

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!data.eventDate) {
      newLog.eventDate = '* Campo Data é obrigatório';
      errorCount++;
    } else {
      newLog.eventDate = '';
    }

    if (!data.startTime) {
      newLog.startTime = '* Campo Horário de Início é obrigatório';
      errorCount++;
    } else {
      newLog.startTime = '';
    }

    if (!data.endTime) {
      newLog.endTime = '* Campo Horário de Término é obrigatório';
      errorCount++;
    } else {
      newLog.endTime = '';
    }

    if (!data.eventType) {
      newLog.eventType = '* Campo Tipo do Evento é obrigatório';
      errorCount++;
    } else {
      newLog.eventType = '';
    }

    if (data.eventType === 'in-person') {
      if (!data.eventLocation) {
        newLog.eventLocation = '* Campo Local do Evento é obrigatório';
        errorCount++;
      } else {
        newLog.eventLocation = '';
      }

      if (!data.postalCode) {
        newLog.postalCode = '* Campo CEP é obrigatório';
        errorCount++;
      } else {
        const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
        if (!cepRegex.test(data.postalCode)) {
          newLog.postalCode = '* Formato de CEP inválido';
          errorCount++;
        } else {
          newLog.postalCode = '';
        }
      }

      if (!data.fullAddress) {
        newLog.fullAddress = '* Campo Endereço é obrigatório';
        errorCount++;
      } else {
        newLog.fullAddress = '';
      }
    }

    if (data.eventType === 'virtual') {
      if (!data.transmission) {
        newLog.transmission = '* Campo Transmissão é obrigatório';
        errorCount++;
      } else {
        newLog.transmission = '';
      }

      if (!data.transmissionLink) {
        newLog.transmissionLink = '* Campo Link da Transmissão é obrigatório';
        errorCount++;
      } else {
        newLog.transmissionLink = '';
      }

      if (!data.transmissionPassword) {
        newLog.transmissionPassword = '* Campo Senha da Transmissão é obrigatório';
        errorCount++;
      } else {
        newLog.transmissionPassword = '';
      }
    }
    console.log(newLog)
    setLog(newLog);

    return errorCount > 0 ? false : true;
  };

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
    value === null || value === '' 
      ? setLog({ ...log, [name]: '* Campo obrigatório' })
      : setLog({ ...log, [name]: '' });
  };

  const getEventDetails = async () => {
    try {
      const response = await apiService.get(`/users/event-details/${event.id}`);
      const { success, message, eventDetails } = response.data;
      if (!success) throw new Error(message);

      if (eventDetails) {
        setData({ ...eventDetails });
        if (eventDetails.fullAddress) startMap(eventDetails.fullAddress);
      }
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar informações do evento.'),
      });
    }
  };

  const save = async () => {
    try {
      setLoading(true);

      if (!validateFields()) throw new Error('Verifique os campos.');

      const dataToSend = {
        ...data,
        eventDate: data.eventDate ? ApplicationUtils.formatToInputDate(data.eventDate) : null,
        startTime: data.startTime ? ApplicationUtils.formatToInputTime(data.startTime) : null,
        endTime: data.endTime ? ApplicationUtils.formatToInputTime(data.endTime) : null,
      };

      const response  = await apiService.put(`/users/event-details/${event.id}`, dataToSend);
      const { success, message } = response.data;

      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        icon: 'fa-solid fa-check',
        text: 'Informações atualizadas!'
      });

      getEventDetails();
    } catch (error) {
      setAlert({
        show: true,
        title: 'Ops!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao atualizar evento.')
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <TitlePage
          title="Informações do Evento"
          subtitle="Tudo em um só lugar para seu convidado"
          align="center"
        />

        <FormContainer margin="2rem auto">
          <InputDate
            label="Data"
            value={data.eventDate}
            onChange={(value) => handleChange('eventDate', value)}
            check={log.eventDate === ''}
            messageError={log.eventDate}
            placeholder="Selecione a data"
          />

          <InputDate
            type="time"
            label={"Horário de início"}
            value={data.startTime}
            onChange={(value) => handleChange('startTime', value)}
            check={log.startTime === ''}
            messageError={log.startTime}
            placeholder="Selecione a hora"
          />

          <InputDate
            type="time"
            label="Horário de término"
            value={data.endTime}
            onChange={(value) => handleChange('endTime', value)}
            check={log.endTime === ''}
            messageError={log.endTime}
            placeholder="Selecione a hora"
          />

          <Select
            label="Tipo do evento"
            messageError={log.eventType}
            data={eventType}
            value={data.eventType || ''}
            onChange={(value) => handleChange('eventType', value)}
          />

          {data?.eventType === 'in-person' && (
            <>
              <Input
                label="Local do Evento"
                placeholder="Ex.: Nome do Buffet, Minha Casa"
                value={data.eventLocation}
                check={log.eventLocation === ''}
                messageError={log.eventLocation}
                onChange={(value) => handleChange('eventLocation', value)}
              />

              <S.WrapperCep>
                <Input
                  label="Cep"
                  placeholder="CEP"
                  value={data.postalCode}
                  onChange={(value) => handleChange('postalCode', value)}
                />
                <button
                  type="button"
                  style={{ background: event.color }}
                  onClick={getCepAndGeoLocation}
                >
                  <span className="fa-solid fa-magnifying-glass"></span>
                </button>
              </S.WrapperCep>


              <Input
                label="Endereço"
                placeholder="Endereço completo ou local"
                value={data.fullAddress}
                check={log.fullAddress === ''}
                messageError={log.fullAddress}
                onChange={(value) => handleChange('fullAddress', value)}
              />

              {urlMap && (
                <iframe
                  width="100%"
                  height="350"
                  src={urlMap}
                  style={{ border: 'none' }}
                  title="mapa"
                >
                </iframe>
              )}
            </>
          )}

          {data?.eventType === 'virtual' && (
            <>
              <Input
                label="Por onde será feita a transmissão"
                placeholder="Ex.: Google Meet, Zoom, Whereby"
                value={data.transmission}
                check={log.transmission === ''}
                messageError={log.transmission}
                onChange={(value) => handleChange('transmission', value)}
              />

              <Input
                label="Link da transmissão"
                placeholder="Cole aqui o link gerado da sua conferência!"
                value={data.transmissionLink}
                check={log.transmissionLink === ''}
                messageError={log.transmissionLink}
                onChange={(value) => handleChange('transmissionLink', value)}
              />

              <Input
                label="Senha da transmissão"
                placeholder="Cole aqui a senha (caso exista)"
                value={data.transmissionPassword}
                check={log.transmissionPassword === ''}
                messageError={log.transmissionPassword}
                onChange={(value) => handleChange('transmissionPassword', value)}
              />
            </>
          )}

          <Button
            background={event?.color}
            text="Salvar"
            isLoading={loading}
            onClick={save}
          />
        </FormContainer>
      </Container>
    </main>
  );
};

export default Info;