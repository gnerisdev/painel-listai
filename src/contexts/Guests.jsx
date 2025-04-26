import { createContext, useEffect, useState, useMemo } from 'react';
import { ApiService } from 'services/api.service';
import Modal from 'components/Modal';

const getSlugFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[1] || null;
};

export const GuestsProvider = (props) => {
  const slug = getSlugFromPath();
  const apiService = useMemo(
    () => new ApiService({ module: 'users', auth: false }),
    [],
  );

  const [state, setState] = useState('loading'); /* loading | ready */
  const [event, setEvent] = useState({});
  const [alert, setAlert] = useState({
    show: false,
    icon: '',
    title: '',
    text: '',
  });

  const getEvent = async () => {
    try {
      const response = await apiService.get(`/guests/event/${slug}`);

      const { success, message, event } = response.data;
      if (!success || !event) throw new Error(message);

      setEvent(event);
      setState('ready');
    } catch (error) {
      // setAlert({
      //   show: true,
      //   title: 'Erro!',
      //   icon: 'fa-solid fa-triangle-exclamation',
      //   text: ApplicationUtils.getErrorMessage(error, 'Erro ao buscar serviços.')
      // });
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (state === 'loading') return <div>Carregando...</div>;

  return (
    <GuestsContext.Provider value={{ event, setEvent, alert, setAlert, apiService }}>
      <Modal
        background={event.color}
        active={alert.show}
        updateShow={(e) => setAlert(e)}
        zIndex={20}
      >
        <div style={{ textAlign: 'center' }}>
          <span className={alert.icon} style={{ fontSize: 40 }}></span>
          <h3>{alert.title}</h3>
          <p
            style={{ margin: 0 }}
            dangerouslySetInnerHTML={{ __html: alert.text }}
          />
        </div>
      </Modal>

      {props.children}
    </GuestsContext.Provider>
  );
};

export const GuestsContext = createContext();
