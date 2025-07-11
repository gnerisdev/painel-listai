import { createContext, useState, useContext } from 'react';
import Modal from 'components/Modal';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });

  return (
    <GlobalContext.Provider value={{ alert, setAlert }}>
      <Modal
        active={alert.show}
        updateShow={(e) => setAlert(e)}
        zIndex={20}
      >
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <span className={alert.icon} style={{ fontSize: 40 }}></span>
          <h3>{alert.title}</h3>
          <p style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: alert.text }} />
        </div>
      </Modal>

      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);