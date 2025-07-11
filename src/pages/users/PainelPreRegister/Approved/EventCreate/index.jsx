import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from 'contexts/Global';
import { PublicApiService } from 'services/api.public.service';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Button from 'components/Button';
import imageDefault from 'assets/default-banner.jpg';
import Step1 from './Step-1';
import Step2 from './Step-2';
import * as S from './style';

const publicApi = new PublicApiService();

const EventCreate = ({ email }) => {
  const navigate = useNavigate();

  const { setAlert } = useGlobal();
  const [loading, setLoading] = useState(false);
  const [stepCurrent, setStepCurrent] = useState('step-event-types');
  const [data, setData] = useState({  email });
  const [eventTypes, setEventTypes] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [gifts, setGifts] = useState([]);

  const submit = async (e) => {
    try {
      setLoading(true);

      const response = await publicApi.post('/users/pre-register/event-info', data);
      const { success, message } = response.data;
      if (!success) throw new Error(message);

      setAlert({
        show: true,
        title: 'Informações enviadas!',
        icon: 'fa-solid fa-check',
        text: 'Obrigados por enviar as informações, em breve seu evento será aprovado.',
      });

      navigate('/', { replace: true }); 
      setTimeout(() => navigate('/pre-register', { state: { email } }), 100);
    } catch (e) {
      setAlert({
        show: true,
        title: 'Erro ao enviar informações!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(e, 'Não foi possível enviar informações do evento. Caso o problema persista, contate o suporte.'),
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (stepCurrent === 'step-event-types') {
      if (!data.eventTypeId) {
        setAlert({
          show: true,
          title: 'Atenção!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: 'Por favor, selecione um tipo de evento para continuar.'
        });

        return;
      }

      try {
        setLoading(true);
        const response = await publicApi.get(`/users/event-categories?event_type_id=${data.eventTypeId}`, data);

        setEventCategories(response.data);
        setStepCurrent('step1');
      } catch (e) {
        setAlert({
          show: true,
          title: 'Erro!',
          icon: 'fa-solid fa-triangle-exclamation',
          text: 'Não foi possível carregar as categorias do evento. Caso o problema persista, contate o suporte.',
        });      
      } finally {
        setLoading(false);
      }
    }

    if (stepCurrent === 'step1') {
      try {
        setLoading(true);

        const response = await publicApi.get(
          `/users/fetch-gifts-slug?event_category_id=${data.eventCategoryId}&slug=${data.slug}`,
          data
        );  

        const { gifts, success, message } = response.data;
        if (gifts.length < 1) throw new Error(message);

        setGifts(gifts);
        setStepCurrent('step2');
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

    if (stepCurrent === 'step2') submit();
  };

  const getEventTypes = async () => {
    try {
      setLoading(true);

      const response = await publicApi.get('/users/event-types', data);
      setEventTypes(response.data);
    } catch (e) {
      setAlert({
        show: true,
        title: 'Erro ao carregar os tipos de eventos',
        icon: 'fa-solid fa-triangle-exclamation',
        text: 'Não foi possível carregar os tipos de eventos, tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlerClickChangeStep = (step) => {
    const stepOrder = ['step1', 'step2', 'step3'];
    const currentIndex = stepOrder.indexOf(stepCurrent);
    const targetIndex = stepOrder.indexOf(step);
    if (targetIndex <= currentIndex) setStepCurrent(step);
  };

  useEffect(() => {
    getEventTypes();
    setData({ ...data, email: data.email });
  }, []);

  return (
    <S.Content>
      <S.Steps>
        <span
          className={`${stepCurrent === 'step1' ? 'stepCurrent' : ''}`}
          onClick={() => handlerClickChangeStep('step1')}
        />
        <span
          className={`${stepCurrent === 'step2' ? 'stepCurrent' : ''}`}
          onClick={() => handlerClickChangeStep('step2')}
        />
      </S.Steps>

      {stepCurrent === 'step-event-types' && (
        <div>
          <h3>Tipo do evento:</h3>

          <S.ListEventTypes >
            {eventTypes?.map(item => (
              <S.ItemEventTypes
                key={item.name}
                onClick={() => setData({ ...data, eventTypeId: item.id })}
                className={`${item.id === data?.eventTypeId ? 'selected' : ''}`}
              >
                <img src={item.imageUrl || imageDefault} alt={item.title} />
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
          giftList={gifts}
          isLoading={loading}
          getData={(v) => setData({ ...data, ...v })}
          next={() => nextStep()}
        />
      )}
    </S.Content>
  );
};

export default EventCreate;;