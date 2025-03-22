import Modal from 'components/Modal';
import { createContext, useEffect, useState } from 'react';
import { ApiService } from 'services/api.service';

export const HostsContext = createContext();

export const HostsProvider = (props) => {
  const apiService = new ApiService();
  const [host, setHost] = useState({});
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [authState, setAuthState] = useState('checking');
  
  // checking => Verifying provider status  
  // authenticated => Provider is authenticated  
  // unauthorized => Provider is not authorized

  const getHost = async () => {
    try {
      const response = await apiService.get(`/hosts/data`);

      const host = await response.data;
      setHost(host);

      if (response.status === 401 || response.status === 404) {
        return setAuthState('unauthorized');
      }

      setAuthState('authenticated');
    } catch (e) {
      setAuthState('unauthorized');
    }
  };

  useEffect(() => {
    getHost();
  }, []);

  return (
    <HostsContext.Provider
      value={{
        host,
        setHost,
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
          <small style={{ margin: 0 }}>{alert.text}</small>
        </div>
      </Modal>

      {props.children}
    </HostsContext.Provider>
  );
};
