import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import ToggleSwitch from 'components/ToggleSwitch';
import InputUrl from 'components/InputUrl';

const Settings = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    showGiftList: true,
    showGuestMessages: true,
    showEventInfo: true,
    allowGuestConfirmation: true,
    eventSlug: '',
  });

  const getData = async () => {
    try {
      const { data } = await apiService.get(`/users/event-settings/${event.id}`);
      if (!data.success) throw new Error(data.message);
      setData({
        showGiftList: data.settings.showGiftList,
        showGuestMessages: data.settings.showGuestMessages,
        showEventInfo: data.settings.showEventInfo,
        allowGuestConfirmation: data.settings.allowGuestConfirmation,
        eventSlug: data.settings.eventSlug || '',
      });
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar configurações do evento.'),
      });
    }
  };

  const save = async () => {
    try {
      setLoading(true);

      const response = await apiService.put(`/settings/${event.id}`, {
        showGiftList: data.showGiftList,
        showGuestMessages: data.showGuestMessages,
        showEventInfo: data.showEventInfo,
        allowGuestConfirmation: data.allowGuestConfirmation,
        eventSlug: data.eventSlug,
      });

      if (!response.data.success) throw new Error(response.data.message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Configurações do evento salvas com sucesso.',
        icon: 'fa-solid fa-check',
      });
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        title: 'Erro!',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar configurações do evento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <Header back={-1} background={event.color} />

        <TitlePage 
          title="Configurações do Evento" 
          subtitle="Depois de alterar, é só clicar em salvar"
          align="center" 
        />

        <FormContainer margin="2rem auto">
          <ToggleSwitch
            label="Lista de Presentes"
            checked={data.showGiftList}
            onChange={(e) => setData({ ...data, showGiftList: e.target.checked })}
          />

          <ToggleSwitch
            label="Recados"
            checked={data.showGuestMessages}
            onChange={(e) => setData({ ...data, showGuestMessages: e.target.checked })}
          />

          <ToggleSwitch
            label="Informações do Evento"
            checked={data.showEventInfo}
            onChange={(e) => setData({ ...data, showEventInfo: e.target.checked })}
          />

          <ToggleSwitch
            label="Confirmação de Presença"
            checked={data.allowGuestConfirmation}
            onChange={(e) => setData({ ...data, allowGuestConfirmation: e.target.checked })}
          />

          <InputUrl
            label="URL - Link do evento"
            value={data.eventSlug}
            onChange={(e) => setData({ ...data, eventSlug: e.target.value })}
            onBlur={() => {}}
          />

          <Button
            background={event?.color}
            text="Salvar"
            isLoading={loading}
            onClick={save}
            margin="2rem 0 0"
          />
        </FormContainer>
      </Container>
    </main>
  );
};

export default Settings;
