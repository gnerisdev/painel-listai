import { createContext, useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiService } from 'services/api.service';
import Modal from 'components/Modal';

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, '');
  const isAuthPage = pathname === '/admin/login';
  const apiService = useMemo(
    () => new ApiService({ module: 'admin', auth: !isAuthPage }),
    [isAuthPage],
  );

  const [admin, setAdmin] = useState({});
  const [token, setToken] = useState('');
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [authState, setAuthState] = useState('checking');

  // checking => Verifying provider status  
  // authenticated => Provider is authenticated  
  // unauthorized => Provider is not authorized

  const getAdmin = async () => {
    try {
      const response = await apiService.get(`/admin/me`);
      const { admin } = await response.data;

      if (response.status === 401 || response.status === 404) {
        return setAuthState('unauthorized');
      }

      setAdmin(admin);
      setAuthState('authenticated');
    } catch (e) {
      setAuthState('unauthorized');
    }
  };

  useEffect(() => {
    if (authState === 'checking') getAdmin();
  }, [authState]);

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        token,
        setToken,
        authState,
        alert,
        setAlert,
        apiService
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
    </AdminContext.Provider>
  );
};