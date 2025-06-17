import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import ToggleSwitch from 'components/ToggleSwitch';
import InputUrl from 'components/InputUrl';
import Input from 'components/Input';

const Settings = () => {
  const { apiService, event, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    showGiftList: true,
    showGuestMessages: true,
    showEventInfo: true,
    allowGuestConfirmation: true,
    slug: '',
    password: ''
  });

  const validateForm = () => {
    let errorMessage = '';

    if (!data.slug.trim()) {
      errorMessage = 'O link do evento não pode ser vazio.';
    } else if (data.password && data.password.length < 6) {
      errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (errorMessage) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: errorMessage,
        icon: 'fa-solid fa-triangle-exclamation',
      });
      return false;
    }
    return true;
  };

  const save = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      const response = await apiService.put(`/users/event/${event.id}/settings`, data);

      if (!response.data.success) throw new Error(response.data.message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Configurações do evento salvas com sucesso.',
        icon: 'fa-solid fa-check',
      });
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar configurações do evento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await apiService.get(`/users/event/${event.id}/settings`);
      const { success, message, settings } = response.data;

      if (!success) throw new Error(message);
      if (settings) setData(settings);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao recuperar configurações do evento.'),
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <TitlePage 
          title="Configurações" 
          subtitle="Depois de alterar, é só clicar em salvar"
          align="center" 
        />

        <FormContainer margin="2rem auto">
          <ToggleSwitch
            label="Lista de Presentes"
            checked={data.showGiftList}
            onChange={value => setData({ ...data, showGiftList: value })}
          />

          <ToggleSwitch
            label="Recados"
            checked={data.showGuestMessages}
            onChange={value => setData({ ...data, showGuestMessages: value })}
          />

          <ToggleSwitch
            label="Informações do Evento"
            checked={data.showEventInfo}
            onChange={value => setData({ ...data, showEventInfo: value })}
          />

          <ToggleSwitch
            label="Confirmação de Presença"
            checked={data.allowGuestConfirmation}
            onChange={value => setData({ ...data, allowGuestConfirmation: value })}
          />

          <InputUrl
            label="URL - Link do evento"
            url="https://site.listai.com.br/"
            value={data.slug}
            onChange={value => setData({ ...data, slug: value })}
          />

          <Input
            label="Senha"
            value={data.password}
            onChange={value => setData({ ...data, password: value })}
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
