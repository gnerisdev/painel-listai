import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ApiService } from 'services/api.service';
import { ProvidersContext } from 'contexts/Hosts';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BackdropLoading from 'components/BackdropLoading';
import * as S from './style';


const Register = () => {
  const apiService = new ApiService(false);
  const navigate = useNavigate();
  const { toast } = useContext(ProvidersContext);
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
    cpf: '',
    name: '',
    birthDate: '',
    phoneNumber: '',
    whatsappNumber: ''
  });

  const toastSuport = () => {
    toast.error(
      <div>
        Não foi possível fazer o cadastro, caso precise de ajuda entre em
        contato com nosso suporte
        <Button variant="outlined" color="success" sx={{ width: '100%' }}>
          <i className="fa-brands fa-whatsapp" style={{ fontSize: '1.2rem' }}></i>
          <span> Chamar suporte</span>
        </Button>
      </div>,
      { duration: 5000 },
    );
  };

  const handleSubmit = async (e) => {
    try {
      if (
        !data.email || 
        !data.password || 
        !data.passwordRepeat ||
        !data.whatsappNumber || 
        !data.phoneNumber || 
        !data.name
      ) {
        return toast.error('Todos os campos precisam serem preencidos!');
      }

      if (data.password !== data.passwordRepeat) {
        return toast.error('As senhas não correspondem');
      }

      if (!terms) {
        return toast.error('Você deve aceitar os termos para prosseguir');
      }

      setLoading('Fazendo cadastro...');

      const response = await apiService.post('/hosts/register', data);

      if (!response.data.success) {
        if (!response?.data?.message) return toastSuport();
        toast.error(response.data.message);
      }

      toast.success('Successo! Faça o login para continuar.');
      setTimeout(() => navigate('/hosts/login'), 2000);
    } catch (error) {
      console.log(error)
      if (error.response.data?.message) {
        return toast.error(error.response.data.message);
      }
      return toastSuport();
    } finally {
      setTimeout(() => setLoading(false));
    }
  };

  return (
    <ThemeProvider theme={S.ThemeDark}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">Nova conta</Typography>

          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Seu nome completo"
                  autoFocus
                  data={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={data.email}
                  label="Seu email"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  value={data.cpf}
                  label="Seu CPF (somente número)"
                  onChange={(e) => setData({ ...data, cpf: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={data.phoneNumber}
                  label="Número para contato"
                  onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={data.whatsappNumber}
                  label="Número whatsapp (Caso seja diferente)"
                  onChange={(e) => setData({ ...data, whatsappNumber: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  value={data.birthDate}
                  label="Data de nascimento"
                  onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Repita a senha"
                  type="password"
                  name="passwordRepeat"
                  value={data.passwordRepeat}
                  onChange={(e) => setData({ ...data, passwordRepeat: e.target.value })}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value={terms} onChange={() => setTerms(!terms)} color="primary" />
                  }
                  label={
                    <Link href="hosts/terms" target="blank">Eu aceito todos os termos.</Link>
                  }
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Cadastrar
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="hosts/login">Já tem uma conta? Entre agora!</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
          {'Copyright © '}
          <Link color="inherit" href="">Casa Clean{" "}</Link>
          {new Date().getFullYear()}
        </Typography>
      </Container>

      <BackdropLoading loading={loading} />
    </ThemeProvider>
  );
};

export default Register;
