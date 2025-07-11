import { useState } from 'react';
import { useGlobal } from 'contexts/Global';
import { useNavigate } from 'react-router-dom';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import { PublicApiService } from 'services/api.public.service';
import { EMAIL_REGEX, PHONE_NUMBER_REGEX, PASSWORD_REGEX } from 'constants/Regexs';
import Container from 'components/Container';
import Button from 'components/Button';
import logo from 'assets/logo-2.png';
import Input from 'components/Input';
import * as S from './style';

const publicApi = new PublicApiService();

const Register = () => {
  const navigate = useNavigate();

  const { setAlert } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    phoneNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [log, setLog] = useState({
    firstName: null,
    lastName: null,
    phoneNumber: null,
    email: null,
    password: null,
    confirmPassword: null
  });

  const handleInput = (name, value) => {
    let formattedValue = value;

    if (name === 'phoneNumber') {
      formattedValue = ApplicationUtils.formatPhone(value);
    }

    setData({ ...data, [name]: formattedValue });

    let errorMessage = '';

    if (value === '') {
      errorMessage = '* Campo obrigatório';
    } else {
      if (name === 'email') {
        const isValid = EMAIL_REGEX.test(value);
        errorMessage = isValid ? '' : '* E-mail inválido';
      } else if (name === 'phoneNumber') {
        const isValid = PHONE_NUMBER_REGEX.test(formattedValue);
        errorMessage = isValid ? '' : '* Número inválido';
      } else if (name === 'password') {
        const isValid = PASSWORD_REGEX.test(value);
        errorMessage = isValid ? '' : '* A senha deve ter pelo menos 8 caracteres, incluindo letras e números';
      } else if (name === 'confirmPassword') {
        errorMessage = value === data.password ? '' : '* As senhas não coincidem';
      }
    }
    setLog({ ...log, [name]: errorMessage });
  };

  const validateFields = () => {
    let isValid = true;
    const newLog = { ...log };

    for (const key in data) {
      if (data[key] === '') {
        newLog[key] = '* Campo obrigatório';
        isValid = false;
      }
    }

    if (data.email !== '' && !EMAIL_REGEX.test(data.email)) {
      newLog.email = '* E-mail inválido';
      isValid = false;
    }
    if (data.phoneNumber !== '' && !PHONE_NUMBER_REGEX.test(ApplicationUtils.formatPhone(data.phoneNumber))) {
      newLog.phoneNumber = '* Número inválido';
      isValid = false;
    }
    if (data.password !== '' && !PASSWORD_REGEX.test(data.password)) {
      newLog.password = '* A senha deve ter pelo menos 8 caracteres, incluindo letras e números';
      isValid = false;
    }
    if (data.confirmPassword !== '' && data.confirmPassword !== data.password) {
      newLog.confirmPassword = '* As senhas não coincidem';
      isValid = false;
    }

    setLog(newLog);
    return isValid;
  };

  const submit = async (e) => {
    if (loading) return;

    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      const response = await publicApi.post('/users/pre-register', data);
      const { success, message } = response.data;

      if (!success) throw new Error(message);
      navigate('/pre-register', { state: { email: data.email } });
    } catch (e) {
      setAlert({
        show: true,
        title: 'Cadastro',
        icon: 'fa-solid fa-triangle-exclamation',
        text: e?.response?.data?.message || 'Erro ao fazer o cadastro.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Main>
      <Container>
        <S.Logo src={logo} alt="Logomarca Listai" />

        <h3>Lista de presente</h3>
        <p>
          Complete suas informações e conclua um pequeno pagamento
          para criarmos sua lista de presente!
        </p>

        <S.WrapperForm>
          <S.Row style={{ display: 'grid' }}>
            <Input
              label="Nome"
              value={data.firstName}
              check={log.firstName === ''}
              messageError={log.firstName}
              onChange={(value) => handleInput('firstName', value)}
            />

            <Input
              label="Sobrenome"
              value={data.lastName}
              check={log.lastName === ''}
              messageError={log.lastName}
              onChange={(value) => handleInput('lastName', value)}
            />
          </S.Row>

          <Input
            label="Celular"
            type="tel"
            value={data.phoneNumber}
            messageError={log.phoneNumber}
            check={log.phoneNumber === ''}
            onChange={(value) => handleInput('phoneNumber', value)}
          />

          <Input
            label="E-mail"
            type="email"
            value={data.email}
            messageError={log.email}
            check={log.email === ''}
            onChange={(value) => handleInput('email', value)}
          />

          <S.Row>
            <Input
              label="Senha"
              type="password"
              value={data.password}
              check={log.password === ''}
              messageError={log.password}
              onChange={(value) => handleInput('password', value)}
            />

            <Input
              label="Confirmar senha"
              type="password"
              value={data.confirmPassword}
              check={log.confirmPassword === ''}
              messageError={log.confirmPassword}
              onChange={(value) => handleInput('confirmPassword', value)}
            />
          </S.Row>

          <Button
            isLoading={loading}
            onClick={submit}
            text="Concluir"
            icon="fa-solid fa-user-plus"
            margin="8px 0 0"
          />
        </S.WrapperForm>
      </Container>
    </S.Main >
  );
};

export default Register;