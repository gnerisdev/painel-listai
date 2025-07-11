import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from 'contexts/Admin';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Container from 'components/Container';
import TitlePage from 'components/TitlePage';
import Button from 'components/Button';
import Step1 from './Step-1';
import Step2 from './Step-2';
import Step3 from './Step-3';
import imageDefault from 'assets/default-banner.jpg';
import * as S from './style';

const EventCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const { apiService, setAlert } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [stepCurrent, setStepCurrent] = useState('step-event-types');
  const [data, setData] = useState({});
  const [eventTypes, setEventTypes] = useState([]);
  const [eventCategories, setEventCategories] = useState([]);
  const [giftList, setGiftList] = useState([]);

  const submit = async (e) => {
    try {
      setLoading(true);

      const response = await apiService.post('/users/register', data);
      const { success, token, id, message } = response.data;
      if (!success) throw new Error(message);

       setAlert({
        show: true,
        title: 'Evento criado com sucesso!',
        icon: 'fa-solid fa-check',
        text: 'O evento foi criado com sucesso. Redirecionando...',
      });

      const timeout = setTimeout(() => navigate('/events'), 3000);
      return () => clearTimeout(timeout);
    } catch (e) {
      setAlert({
        show: true,
        title: 'Erro ao criar evento!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(e, 'Não foi possível criar o evento.')
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (stepCurrent === 'step-event-types') {
      if (!data?.eventTypeId) {
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
        const response = await apiService.get(`/users/event-categories?event_type_id=${data.eventTypeId}`, data);

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
          `/users/fetch-gifts-slug?event_category_id=${data.eventCategoryId}&slug=${data.slug}`,
          data
        );

        const { gifts, slug_available, message } = response.data;

        if (!slug_available) {
          setAlert({
            show: true,
            title: 'Lista de Presentes',
            icon: 'fa-solid fa-triangle-exclamation',
            text: message || 'O link está em uso, por favor, crie outro.'
          });
        }

        if (gifts) {
          setGiftList(gifts);
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

      const response = await apiService.get('/admin/event-types', data);
      setEventTypes(response.data.eventTypes);
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
    console.log(state)
    if (state) setData({ ...data, ...state });
    getEventTypes();
  }, []);

  return (
    <main style={{ margin: '72px 0' }}>
      <Container>
        <TitlePage icon="fa-solid fa-gift" title="Novo evento" />

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
            <span
              className={`${stepCurrent === 'step3' ? 'stepCurrent' : ''}`}
              onClick={() => handlerClickChangeStep('step3')}
            />
          </S.Steps>

          {stepCurrent === 'step-event-types' && (
            <div>
              <h2>Tipo do evento:</h2>

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
              giftList={giftList}
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
        </S.Content>
      </Container>
    </main >
  );
};

export default EventCreate; 