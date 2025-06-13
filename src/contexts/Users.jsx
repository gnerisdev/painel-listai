import { createContext, useEffect, useState, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import Modal from 'components/Modal';
import LoadingLogo from 'components/LoadingLogo';

export const UsersProvider = (props) => {
  const alertRef = useRef(false);

  const location = useLocation();
  const normalizedPathname = location.pathname.replace(/\/$/, '');
  const isAuthPage = (normalizedPathname === '/login' || normalizedPathname === '/register');
  const apiService = useMemo(
    () => new ApiService({ module: 'users', auth: !isAuthPage }),
    [isAuthPage],
  );

  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});
  const [token, setToken] = useState(localStorage.getItem('userToken') || '');
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [authState, setAuthState] = useState('checking');

  const getUser = async () => {
    try {
      const response = await apiService.get(`/users/me`);

      if (response.status === 401 || response.status === 404) {
        return setAuthState('unauthorized');
      }

      const { user, event } = response.data;
      setUser(user);
      setEvent(event);
      setAuthState('authenticated');

      // Chage color
      document.documentElement.style.setProperty('--primary-color', event.color);
    } catch (e) {
      setAuthState('unauthorized');
    }
  };

  useEffect(() => {
    if (authState === 'checking') getUser();
  }, [authState]);

  useEffect(() => {

  }, [alert])

  if (authState === 'checking') return <LoadingLogo />;

  return (
    <UsersContext.Provider
      value={{
        user,
        setUser,
        event,
        setEvent,
        token,
        setToken,
        authState,
        alert,
        setAlert,
        apiService,
      }}
    >
      {alert.show && (
        <Modal active={alert.show} updateShow={(e) => setAlert(e)} zIndex={20}>
          <div style={{ textAlign: "center" }}>
            <span className={alert.icon} style={{ fontSize: 40 }}></span>
            <h3>{alert.title}</h3>
            <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: alert.text }}></p>
          </div>
        </Modal>
      )}

      {props.children}
    </UsersContext.Provider>
  );
};

export const UsersContext = createContext();
