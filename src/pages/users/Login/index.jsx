import { useContext, useState } from 'react';
import { ApiService } from 'services/api.service';
import { UsersContext } from 'contexts/Users';
import Container from 'components/Container';
import Input from 'components/Input';
import Button from 'components/Button';
import * as S from './style';

export default function Login() {
  const apiService = new ApiService(false);
  const { setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [log, setLog] = useState({ email: null, password: null });

  const handleSubmit = async (e) => {
    try {
      // setAlert({ show: true, title: 'Login', text: 'Dados inválidos' });
      console.log('okkk');

      if (!data.email) {
        return;
      }

      if (!data.password) {
        return;
      }

      const response = await apiService.post('/users/login', data);

      // if (!response.data.success) return toast.error(response.data.message);

      localStorage.setItem('id', JSON.stringify(response.data.id));
      localStorage.setItem('hostToken', JSON.stringify(response.data.token));


      console.log(response.data);
    } catch (e) {
      console.log(e);
      // return toast.error(e.response.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const validateInput = (name, text) => {
    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(text)) {
        setLog({ ...log, email: '* E-mail inválido' });
        return;
      }

      setLog({ ...log, email: '' });
    }

    if (name === 'password') {
      if (text?.length < 1) {
        setLog({ ...log, password: '* Senha inválida' });
        return;
      }

      setLog({ ...log, password: '' });
    }
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
            messageError={log.email}
            check={log.email === ''}
            getData={(text) => {
              setData({ ...data, email: text?.trim() });
              validateInput('email', text?.trim());
            }}
          />

          <Input
            label="Senha"
            type="password"
            check={log.password === ''}
            getData={(text) => {
              setData({ ...data, password: text?.trim() });
              validateInput('password', text?.trim());
            }}
          />

          <S.ForgetPass href="/">Redefinir senha</S.ForgetPass>
        </S.WrapperForm>

        <Button text="Entrar" onClick={handleSubmit} />

        <S.Line>
          <span></span>
          <span>ou</span>
          <span></span>
        </S.Line>

        <S.TextSmall>
          Não possui conta? {" "}
          <S.Link 
            onClick={() => {}}
          >
            Clique
          </S.Link> {" "}
          para cadastrar.
        </S.TextSmall>

        <S.TextSmall> Ambiente Seguro</S.TextSmall>

        <S.TextSmall>
          Uma empresa do grupo iBabySite & Wegadr  <br />
          © Mimon. Todos os direitos reservados.
        </S.TextSmall>
      </Container>
    </S.Main>
  );
}
