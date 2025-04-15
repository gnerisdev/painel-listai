import { useContext, useState } from 'react';
import { AdminContext } from 'contexts/Admin';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import logo from 'assets/logo-2.png';
import FormContainer from 'components/FormContainer';
import * as S from './style';

const Login = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const { apiService, setAlert } = useContext(AdminContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [log, setLog] = useState({ email: null, password: null });

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      if (!data.email || !data.password)
        throw new Error('Preencha os dados corretamente!');
      if (!validateFields()) throw new Error('Preencha os dados corretamente!');

      const response = await apiService.post('/admin/login', data);

      const { success, message, token, admin } = response.data;
      if (!success) {
        setAlert({ show: true, title: 'Login', text: message });
        return;
      }

      if (!admin.id && !token) throw new Error('Erro ao fazer login!');

      localStorage.setItem('adminId', JSON.stringify(admin.id));
      localStorage.setItem('adminToken', JSON.stringify(token));
      window.location.href = '/admin';
    } catch (e) {
      const message = e?.response?.data?.message || e?.message;
      setAlert({ show: true, title: 'Login', text: message });
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;

    if (!data.email) {
      newLog.email = '* Campo obrigatório';
      errorCount++;
    } else if (!emailRegex.test(data.email)) {
      newLog.email = '* Formato de e-mail inválido';
      errorCount++;
    } else {
      newLog.email = '';
    }

    if (!data.password) {
      newLog.password = '* Senha inválida';
      errorCount++;
    } else {
      newLog.password = '';
    }

    setLog(newLog);

    return errorCount === 0 ? true : false;
  };

  return (
    <S.Main>
      <Container>
        <S.Content>
          <S.Logo src={logo} alt="Logomarca" />

          <S.Subtitle>Painel do administrador</S.Subtitle>

          <FormContainer>
            <Input
              label="E-mail"
              type="email"
              value={data.email}
              messageError={log.email}
              check={log.email === ''}
              onChange={(value) => {
                setData({ ...data, email: value });
                if (!emailRegex.test(value)) {
                  setLog({ ...log, email: '* E-mail inválido' });
                  return;
                }
                setLog({ ...log, email: '' });
              }}
            />

            <Input
              label="Senha"
              type="password"
              value={data.password}
              messageError={log.password}
              check={log.password === ''}
              onChange={(value) => {
                setData({ ...data, password: value });
                if (!value) {
                  setLog({ ...log, password: '* Senha inválido' });
                  return;
                }
                setLog({ ...log, password: '' });
              }}
            />
          </FormContainer>

          <Button text="Entrar" isLoading={loading} onClick={handleSubmit} />
        </S.Content>
      </Container>
    </S.Main>
  );
};

export default Login;
