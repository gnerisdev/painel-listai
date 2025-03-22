import { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ApiService } from 'services/api.service';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const apiService = new ApiService();
  const [company, setCompany] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [authenticationStatus, setAuthenticationStatus] = useState('authenticating');
  
  const getComapny = async () => {
    try {
      const response = await apiService.get(`/admin/company`);
      const company = await response.data;

      setCompany(company);

      if (response.status === 401) return setAuthenticationStatus('unauthenticated');

      setAuthenticationStatus('authenticated');
    } catch (e) {
      setAuthenticationStatus('unauthenticated');
    }
  };

  useEffect(() => {
    getComapny();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        company,
        setCompany,
        token,
        setToken,
        loading,
        setLoading,
        toast,
        authenticationStatus,
      }}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {props.children}
    </GlobalContext.Provider>
  );
};
