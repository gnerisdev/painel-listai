import { useEffect, useState, useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Header from 'components/Header';
import FormContainer from 'components/FormContainer';
import Button from 'components/Button';
import Input from 'components/Input';
import SelectColor from 'components/SelectColor';
import TitlePage from 'components/TitlePage';
import Container from 'components/Container';

const Custom = () => {
  const { apiService, event, setEvent, setAlert } = useContext(UsersContext);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    titleDescription: '',
    description: '',
    color: ''
  });
  const [log, setLog] = useState({
    title: null,
    subtitle: null,
    titleDescription: null,
    description: null,
    color: null
  });

  const validateFields = () => {
    const newLog = { ...log };
    let errorCount = 0;

    for (const key in data) {
      if (!data[key]) {
        console.log(key)
        errorCount = (errorCount + 1);
        newLog[key] = '* Campo obrigatório';
      } else {
        newLog[key] = '';
      }
    }

    setLog(newLog);

    return errorCount > 0 ? false : true;
  };

  const save = async () => {
    try {
      setLoading(true);
      if (!validateFields()) throw new Error('Verifique os campos.');
      const { data: response } = await apiService.put(`/users/event/${event.id}`, data);
      setData(response.event);
      setEvent(response.event);
      setAlert({ 
        show: true, 
        title: 'Sucesso!', 
        text: 'Informações atualizadas.', 
        icon: 'fa-solid fa-check' 
      });
    } catch (error) {
      setAlert({ 
        show: true, 
        title: 'Erro!', 
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao atualizar evento.') 
      });
    } finally {
      setLoading(false);
    }
  };

  const getValue = async (name, value) => {
    setData({ ...data, [name]: value });
    value === ''
      ? setLog({ ...log, [name]: '* Campo obrigatório' })
      : setLog({ ...log, [name]: '' });
  };

  const getEvent = async () => {
    try {
      const { data } = await apiService.get(`/users/event/${event.id}`);
      setData(data.event);
    } catch (error) {
      setAlert({ show: true, title: 'Erro!', text: 'Erro ao buscar evento.' });
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <main style={{ marginTop: 70 }}>
      <Container>
        <Header back={-1} background={data.color} />

        <TitlePage
          title="Cores e Textos"
          subtitle="Deixe o site do seu evento com a sua cara"
          align="center"
        />

        <FormContainer margin="2rem auto">
          <Input
            label="Título"
            value={data.title}
            check={log.title === ''}
            messageError={log.title}
            onChange={(value) => getValue('title', value)}
          />

          <Input
            label="Subtítulo"
            placeholder="Ex.: 11 de Janeiro de 2025"
            value={data.subtitle}
            check={log.subtitle === ''}
            messageError={log.subtitle}
            onChange={(value) => getValue('subtitle', value)}
          />

          <Input
            label="Título da Introdução"
            placeholder="Ex.: Sejam bem-vindos!"
            value={data.titleDescription}
            check={log.titleDescription === ''}
            messageError={log.titleDescription}
            onChange={(value) => getValue('titleDescription', value)}
          />

          <Input
            type="textarea"
            label="Introdução"
            value={data.description}
            check={log.description === ''}
            messageError={log.description}
            onChange={(value) => getValue('description', value)}
          />

          <SelectColor
            label="Selecione uma cor"
            selected={data.color || []}
            getData={(value) => setData({ ...data, color: value })}
            messageError={log.color}
          />

          <Button 
            background={data.color}
            text="Salvar" 
            isLoading={loading} 
            onClick={save} 
          />
        </FormContainer>
      </Container>
    </main>
  );
};

export default Custom;
