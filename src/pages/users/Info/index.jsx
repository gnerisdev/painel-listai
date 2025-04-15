import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Select from 'components/Select';
import * as S from './style';

const Info = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState({});
  const [urlMap, setUrlMap] = useState(null);
  const [data, setData] = useState({
    date: '',
    startTime: '',
    endTime: '',
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
    { title: 'Prensencial', value: 'in-person' },
    { title: 'Virtual', value: 'virtual' },
  ];

  const getCepAndGeoLocation = async () => {
    if (!data?.postalCode) return;

    try {
      const response = await apiService.externalQuery(
        `https://viacep.com.br/ws/${encodeURIComponent(data?.postalCode)}/json/`,
        'get', null, {},
      );

      const { uf, logradouro, bairro, localidade } = response.data;

      getGeolocation(`${logradouro}, ${bairro}, ${localidade}, ${uf}`);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const getGeolocation = async (fullAddress) => {
    console.log(fullAddress)
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
        console.log(places)
        const mapUrl = `/marker-map.html?lat=${lat}&lon=${lon}&color=${event.color}`;
        setUrlMap(mapUrl);
      } else {

      }
    } catch (error) {
      console.error('Erro ao buscar localização:', error);
    }
  };

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;
  
    if (!data.date) {
      newLog.date = '* Campo Data é obrigatório';
      errorCount++;
    } else {
      newLog.date = '';
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
  
    setLog(newLog);
  
    return errorCount > 0 ? false : true;
  };

  const getValue = async (name, value) => {
    setData({ ...data, [name]: value });
    value === ''
      ? setLog({ ...log, [name]: '* Campo obrigatório' })
      : setLog({ ...log, [name]: '' });
  };

  const getEventDetails = async () => {
    try {
      const { data } = await apiService.get(`/users/event-details/${event.id}`);
      if (data.eventDetails) setData(data.eventDetails);
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
      setLoading(true);

      if (!validateFields()) throw new Error('Verifique os campos.');
      const { data: response } = await apiService.put(`/users/event-details/${event.id}`, data);

      if (response.eventDetails) setData(response.eventDetails);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
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
        <Header back={-1} background={event.color} />

        <TitlePage
          title="Informações do Evento"
          subtitle="Tudo em um só lugar para seu convidado"
          align="center"
        />

        <FormContainer margin="2rem auto">
          <Input
            label="Data"
            type="date"
            value={data.date}
            check={log.date === ''}
            messageError={log.date}
            onChange={(value) => getValue('date', value)}
          />

          <S.Row>
            <Input
              label="Horário de início"
              type="time"
              value={data.startTime}
              check={log.startTime === ''}
              messageError={log.startTime}
              onChange={(value) => getValue('startTime', value)}
            />

            <Input
              label="Horário de término"
              type="time"
              value={data.endTime}
              check={log.endTime === ''}
              messageError={log.endTime}
              onChange={(value) => getValue('endTime', value)}
            />
          </S.Row>

          <Select
            label="Tipo do evento"
            messageError={log.eventType}
            data={eventType}
            value={data.eventType || ''}
            onChange={(value) => {
              getValue('eventType', value);
              value === ''
                ? setLog({ ...log, eventType: '* Campo obrigatório' })
                : setLog({ ...log, eventType: '' });
            }}
          />

          {/* Presencial */}
          {data?.eventType === 'in-person' && (
            <>
              <Input
                label="Local do Evento"
                placeholder="Ex.: Nome do Buffet, Minha Casa"
                value={data.eventLocation}
                check={log.eventLocation === ''}
                messageError={log.eventLocation}
                onChange={(value) => getValue('eventLocation', value)}
              />

              <S.WrapperCep>
                <Input
                  label="Cep"
                  placeholder="CEP"
                  value={data.postalCode}
                  onChange={(value) => getValue('postalCode', value)}
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
                onChange={(value) => getValue('fullAddress', value)}
                onBlur={(value) => getGeolocation(value)}
              />

              {(data.latitude && data.longitude) && (
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

          {/* Virtual */}
          {data?.eventType === 'virtual' && (
            <>
              <Input
                label="Por onde será feita a transmissão"
                placeholder="Ex.: Google Meet, Zoom, Whereby"
                value={data.transmission}
                check={log.transmission === ''}
                messageError={log.transmission}
                onChange={(value) => getValue('transmission', value)}
              />

              <Input
                label="Link da transmissão"
                placeholder="Cole aqui o link gerado da sua conferência!"
                value={data.transmissionLink}
                check={log.transmissionLink === ''}
                messageError={log.transmissionLink}
                onChange={(value) => getValue('transmissionLink', value)}
              />

              <Input
                label="Senha da transmissão"
                placeholder="Cole aqui a senha (caso exista)"
                value={data.transmissionPassword}
                check={log.transmissionPassword === ''}
                messageError={log.transmissionPassword}
                onChange={(value) => getValue('transmissionPassword', value)}
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
