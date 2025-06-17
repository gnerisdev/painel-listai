import { useEffect, useState } from 'react';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { useAdmin } from 'contexts/Admin';
import Button from 'components/Button';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';
import Input from 'components/Input';
import HeaderWithButton from 'components/HeaderWithButton';
import SelectColor from 'components/SelectColor';
import Modal from 'components/Modal';
import LoadingLogo from 'components/LoadingLogo';
import * as S from './style';

const Settings = () => {
  const { apiService, event, setAlert } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    percentageGift: 0,
    color: '',
    colorSecondary: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const changePassword = async () => {
    if (!password || !newPassword || !repeatPassword) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: 'Por favor, preencha todos os campos.',
        icon: 'fa-solid fa-triangle-exclamation',
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: 'As senhas não conferem.',
        icon: 'fa-solid fa-triangle-exclamation',
      });
      return;
    }

    try { 
      setLoading(true);

      const response = await apiService.put(`/admin/password`, { 
        newPassword: newPassword, currentPassword: password,
      });

      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Senha alterada com sucesso.',
        icon: 'fa-solid fa-check',
      });

      setIsModalOpen(false);
      setNewPassword('');
      setPassword('');
      setRepeatPassword('');
    } catch (error) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: ApplicationUtils.getErrorMessage(error, 'Não foi possível alterar a senha.'),
        icon: 'fa-solid fa-triangle-exclamation',
      });
    } finally {
      setLoading(false);
    }
  }

  const save = async () => {
    if (data.percentageGift < 1 || data.percentageGift > 100) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: 'O percentual de doação deve ser entre 1 e 100.',
        icon: 'fa-solid fa-triangle-exclamation',
      });

      return;
    }

    if (!data.color || !data.colorSecondary) {
      setAlert({
        show: true,
        title: 'Atenção!',
        text: 'Por favor, selecione as cores.',
        icon: 'fa-solid fa-triangle-exclamation',
      });

      return;
    }

    try {
      setLoading(true);

      const response = await apiService.put(`/admin/settings`, data);
      const { success, message } = response.data;

      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Sucesso!',
        text: 'Configurações atualizadas.',
        icon: 'fa-solid fa-check',
      });

      getData();

      // Set colors
      document.documentElement.style.setProperty('--primary-color', data.color);
      document.documentElement.style.setProperty('--secondary-color', data.colorSecondary);
    } catch (error) {
      setAlert({
        show: true,
        title: 'Erro!',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao salvar configurações.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await apiService.get(`/admin/settings`);
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
    <Container>
      <HeaderWithButton>
        <TitlePage title="Configurações" icon="fa-solid fa-gear" />
      </HeaderWithButton>

      <S.Main>
        <S.Content>
          <Input
            type="number"
            label="Porcentagem total sobre presente (%)"
            value={data.percentageGift}
            onChange={value => setData({ ...data, percentageGift: value })}
            onBlur={() => { }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 8, alignItems: 'end' }}>
            <Input
              type="password"
              label="Senha de acesso ao painel"
              value="********"
              disabled={true}
            />
            <Button
              text="Alterar"
              onClick={() => setIsModalOpen(true)}
              background="var()"
            />
          </div>

          <SelectColor
            label="Cor padrão do sistena"
            value={data.color}
            getData={value => setData({ ...data, color: value })}
            selected={[data.color]}
          />

          <SelectColor
            label="Cor secundária do sistena"
            value={data.colorSecondary}
            getData={value => setData({ ...data, colorSecondary: value })}
            selected={[data.colorSecondary]}
          />

          <Button
            background={event?.color}
            text="Salvar"
            isLoading={loading}
            onClick={save}
            margin="2rem auto"
            maxWidth={300}
          />
        </S.Content>
      </S.Main>

      <Modal
        active={isModalOpen}
        closeOut={false}
        updateShow={() => setIsModalOpen(false)}
      >
        <S.ContentModal>
          <h2>Alterar senha</h2>
          <p>Para alterar a senha de acesso ao painel, digite a senha atual e a nova senha.</p>

          <Input
            type="password"
            label="Senha atual"
            value={password}
            onChange={value => setPassword(value)}
            onBlur={() => { }}
          />

          <Input
            type="password"
            label="Nova senha"
            value={newPassword}
            onChange={value => setNewPassword(value)}
            onBlur={() => { }}
          />

          <Input
            type="password"
            label="Repetir senha"
            value={repeatPassword}
            onChange={value => setRepeatPassword(value)}
            onBlur={() => { }}
          />

        <Button 
          text="Salvar"   
          onClick={changePassword}   
          isLoading={loading}
        />
        </S.ContentModal>
      </Modal>

      {(loading && data.percentageGift === 0) && <LoadingLogo />}
    </Container>
  );
};

export default Settings;
