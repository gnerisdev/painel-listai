import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGlobal } from 'contexts/Global';
import { PublicApiService } from 'services/api.public.service';
import { EMAIL_REGEX } from 'constants/Regexs';
import Button from 'components/Button';
import Input from 'components/Input';
import * as S from './style';

const publicApi = new PublicApiService();

const Access = ({ email, getData }) => {
  const navigate = useNavigate();
  const { setAlert } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', code: '' });
  const [log, setLog] = useState({ email: null });

  const handleInput = (name, value) => {
    setData({ ...data, [name]: value });

    if (name === 'email') {
      const isValid = EMAIL_REGEX.test(value);
      setLog({ ...log, email: isValid ? '' : '* E-mail inválido' });
      return;
    }
  };

  const getUserRequest = async (email = data.email) => {
    if (!email) return;

    try {
      setLoading(true);

      const response = await publicApi.post('/users/pre-register/get', { email });
      const { success, userRequest, message, accountCreated } = response.data;
      
      if (!success) throw new Error(message);
      if (userRequest) getData(userRequest);
    } catch (e) {
      if (e?.response?.data?.accountCreated) {
        setAlert({
          show: true,
          title: 'Sua conta foi criada com sucesso!',
          icon: 'fa-solid fa-check',
          text: 'Faça o login para começar a usar o site.',
        })

        navigate('/login');

        return;
      }

      setAlert({
        show: true,
        title: 'Cadastro',
        icon: 'fa-solid fa-triangle-exclamation',
        text: e?.response?.data?.message || 'Erro ao buscar informações.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) getUserRequest(email);
  }, []);

  return (

    <S.ContentInfo>
      <h3>Lista de presente</h3>
      <p>
        Insira o email que você cadastro para ter acesso as informações do cadastro
      </p>

      <S.WrapperForm>
        <Input
          label="E-mail"
          type="email"
          value={data.email}
          messageError={log.email}
          check={log.email === ''}
          onChange={(value) => handleInput('email', value)}
        />

        <Button
          isLoading={loading}
          onClick={getUserRequest}
          text="Concluir"
          icon="fa-solid fa-user-plus"
          margin="8px 0 0"
        />
      </S.WrapperForm>
    </S.ContentInfo>
  );
};

export default Access;