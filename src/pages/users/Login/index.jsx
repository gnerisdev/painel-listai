import { useContext, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import logo from 'assets/logo-2.png';
import * as S from './style';

const Login = () => {  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const { apiService, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [log, setLog] = useState({ email: null, password: null });

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      if (!data.email || !data.password) throw new Error('Preencha os dados corretamente!');
      if (!validateFields()) throw new Error('Preencha os dados corretamente!');

      const response = await apiService.post('/users/login', data);
      const { success, message, token, id } = response.data;

      if (!success) {
        setAlert({ show: true, title: 'Login', text: message });
        return;
      }

      localStorage.setItem('userId', JSON.stringify(id));
      localStorage.setItem('userToken', JSON.stringify(token));

      window.location.href = '/home';
    } catch (e) {
      const message = e?.response?.data?.message || e?.message
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
        <S.Logo src={logo} alt="Logomarca" />

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

          <S.ForgetPass href="/">Redefinir senha</S.ForgetPass>
        </S.WrapperForm>

        <Button text="Entrar" isLoading={loading} onClick={handleSubmit} />

        <S.Line>
          <span></span>
          <span>ou</span>
          <span></span>
        </S.Line>

        <S.TextSmall>
          Não possui conta? {" "}
          <S.Link href="users/register">
            Clique
          </S.Link> {" "}
          para cadastrar.
        </S.TextSmall>

        <S.TextSmall> Ambiente Seguro</S.TextSmall>

        <S.TextSmall>
          Uma empresa do grupo iBabySite & Wegadr  <br />
          © Listai. Todos os direitos reservados.
        </S.TextSmall>
      </Container>
    </S.Main>
  );
}

export default Login;