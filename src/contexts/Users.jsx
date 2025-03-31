import Modal from 'components/Modal';
import { createContext, useEffect, useState } from 'react';
import { ApiService } from 'services/api.service';

export const UsersContext = createContext();

export const UsersProvider = (props) => {
  const apiService = new ApiService();
  const [user, setUser] = useState({});
  const [event, setEvent] = useState({});
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [authState, setAuthState] = useState('checking');

  // checking => Verifying provider status  
  // authenticated => Provider is authenticated  
  // unauthorized => Provider is not authorized

  const getUser = async () => {
    try {
      const response = await apiService.get(`/users/me`);
      const { user, event } = await response.data;

      if (response.status === 401 || response.status === 404) {
        return setAuthState('unauthorized');
      }

      setUser(user);
      setEvent(event);
      setAuthState('authenticated');
    } catch (e) {
      setAuthState('unauthorized');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
        setAlert
      }}
    >
      <Modal active={alert.show} updateShow={(e) => setAlert(e)}>
        <div style={{ textAlign: 'center' }}>
          <span className="fa-regular fa-circle-question" style={{ fontSize: 40 }}></span>
          <h3>{alert.title}</h3>
          <small style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: alert.text }} />
        </div>
      </Modal>

      {props.children}
    </UsersContext.Provider>
  );
};
