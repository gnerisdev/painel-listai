import { useContext, useState } from 'react';
import { AdminContext } from 'contexts/Admin';import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
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

      console.log(validateFields())
      if (!data.email || !data.password) throw new Error('Preencha os dados corretamente!');
      if (!validateFields()) throw new Error('Preencha os dados corretamente!');

      console.log('entrou no try')


      const response = await apiService.post('/admin/login', data);

      console.log(response);

      const { success, message, token, id } = response.data;

      console.log('success', success)
      console.log('message', message)
      console.log('token', token)
      console.log('id', id)
      
      if (!success) {
        setAlert({ show: true, title: 'Login', text: message });
        return;
      }

      localStorage.setItem('userId', JSON.stringify(id));
      localStorage.setItem('userToken', JSON.stringify(token));

      window.location.href = '/admin/home';
    } catch (e) {
      const message = e?.response?.data?.message || e?.message
      setAlert({ show: true, title: 'Login', text: message });
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    console.log(data)
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
        <S.Logo
          src="https://painel.mimon.com.br/assets/logos/mimon.png"
          alt="Logomarca"
        />

        <S.Subtitle>Seja bem-vindo!</S.Subtitle>

        <S.Text>Ganhe tempo, facilite para os convidados e incentive o consumo consciente!</S.Text>
        <S.Text>Faça o login para acessar sua conta.</S.Text>

        <S.WrapperForm>
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

        </S.WrapperForm>

        <Button text="Entrar" isLoading={loading} onClick={handleSubmit} />


      </Container>
    </S.Main>
  );
}

export default Login;