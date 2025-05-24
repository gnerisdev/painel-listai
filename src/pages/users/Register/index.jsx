import { useContext, useEffect, useState } from 'react';
import { UsersContext } from 'contexts/Users';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import Button from 'components/Button';
import Step1 from './Step-1';
import Step2 from './Step-2';
import Step3 from './Step-3';
import logo from 'assets/logo-2.png';
import imageDefault from 'assets/default-banner.jpg';
import * as S from './style';

const Register = () => {
  const { apiService, setAlert } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);
  const [stepCurrent, setStepCurrent] = useState('step-event-types');
  const [data, setData] = useState({});
  const [eventTypes, setEventTypes] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [gifts, setGifts] = useState([]);

  const submit = async (e) => {
    try {
      setLoading(true);

      const response = await apiService.post('/users/register', data);
      const { success, token, id, message } = response.data;

      if (success) {
        localStorage.setItem('userId', JSON.stringify(id));
        localStorage.setItem('userToken', JSON.stringify(token));
  
        window.location.href = '/users/home';
      } else {
        throw new Error(message);
      }

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

  const nextStep = async () => {
    if (stepCurrent === 'step-event-types') {
      if (!data?.eventType) {
        setAlert({
          show: true,
          title: 'Atenção',
          icon: 'fa-solid fa-triangle-exclamation',
          text: 'Por favor, selecione um tipo de evento para continuar.'
        });
        return;
      }

      try {
        setLoading(true);
        const response = await apiService.get(`/users/event-categories?event_type_id=${data.eventType}`, data);

        setEventCategories(response.data);
        setStepCurrent('step1');
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    if (stepCurrent === 'step1') {
      try {
        setLoading(true);

        const response = await apiService.get(
          `/users/fetch-gifts-slug?event_category_id=${data.event}&slug=${data.slug}`,
          data
        );

        const { gifts, slug_available, message } = response.data;
        console.log(slug_available)

        if (!slug_available) {
          setAlert({
            show: true,
            title: 'Lista de Presentes',
            icon: 'fa-solid fa-triangle-exclamation',
            text: message || 'O link está em uso, por favor, crie outro.'
          });
        }

        if (gifts) {
          setGifts(gifts);
          setStepCurrent('step2');
        } else {
          throw new Error('Gift não encontrado');
        }
      } catch (error) {
        setAlert({
          show: true,
          title: 'Erro ao prosseguir o cadastro',
          icon: 'fa-solid fa-triangle-exclamation',
          text: ApplicationUtils.getErrorMessage(error, 'Se o problema persistir, contate o suporte.'),          
        });
      } finally {
        setLoading(false);
      }
    }

    if (stepCurrent === 'step2') setStepCurrent('step3');

    if (stepCurrent === 'step3') submit();
  };

  const getEventTypes = async () => {
    try {
      setLoading(true);

      const response = await apiService.get('/users/event-types', data);
      setEventTypes(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventTypes();
  }, []);

  return (
    <S.Main>
      <Container>
        <S.Logo src={logo} alt="Logomarca Listai" />

        <S.Steps>
          <span
            className={`${stepCurrent === 'step1' ? 'stepCurrent' : ''}`}
            onClick={() => setStepCurrent('step1')}
          >
          </span>
          <span
            className={`${stepCurrent === 'step2' ? 'stepCurrent' : ''}`}
            onClick={() => setStepCurrent('step2')}
          >
          </span>
          <span
            className={`${stepCurrent === 'step3' ? 'stepCurrent' : ''}`}
            onClick={() => setStepCurrent('step3')}
          >
          </span>
        </S.Steps>

        {stepCurrent === 'step-event-types' && (
          <div>
            <h2>Qual o seu evento?</h2>

            <S.ListEventTypes >
              {eventTypes?.map(item => (
                <S.ItemEventTypes
                  key={item.name}
                  onClick={() => setData({ ...data, eventType: item.id })}
                  className={`${item.id === data?.eventType ? 'selected' : ''}`}
                >
                  <img src={item.image_url || imageDefault} alt={item.title} />
                  <small>{item.name}</small>
                </S.ItemEventTypes>
              ))}
            </S.ListEventTypes>

            <Button text="Continuar" isLoading={loading} onClick={nextStep} />
          </div>
        )}

        {stepCurrent === 'step1' && (
          <Step1
            data={data}
            eventCategories={eventCategories}
            isLoading={loading}
            getData={(v) => setData({ ...data, ...v })}
            next={() => nextStep()}
          />
        )}

        {stepCurrent === 'step2' && (
          <Step2
            data={data}
            gifts={gifts}
            isLoading={loading}
            getData={(v) => setData({ ...data, ...v })}
            next={() => nextStep()}
          />
        )}

        {stepCurrent === 'step3' && (
          <Step3
            data={data}
            isLoading={loading}
            getData={(v) => setData({ ...data, ...v })}
            next={() => nextStep()}
          />
        )}
      </Container>
    </S.Main >
  );
};

export default Register; 