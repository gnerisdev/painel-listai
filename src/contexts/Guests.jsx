import { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { ApiService } from 'services/api.service';
import Modal from 'components/Modal';
import ShoppingCart from 'components/ShoppingCart';
import LoadingLogo from 'components/LoadingLogo';

const getSlugFromPath = () => {
  const pathParts = window.location.pathname.split('/');
  return pathParts[1] || null;
};

export const GuestsContext = createContext();

export const GuestsProvider = (props) => {
  const slug = getSlugFromPath();
  const apiService = useMemo(() => new ApiService({ module: 'users', auth: false }), []);
  const [state, setState] = useState('loading');
  const [event, setEvent] = useState({});
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    const existingItemIndex = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) || 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

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

  if (state === 'loading') return <LoadingLogo />;

  return (
    <GuestsContext.Provider
      value={{
        event,
        setEvent,
        alert,
        setAlert,
        apiService,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
      }}
    >
      <Modal
        background={event.color}
        active={alert.show}
        updateShow={(e) => setAlert(e)}
        zIndex={20}
      >
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <span className={alert.icon} style={{ fontSize: 40 }}></span>
          <h3>{alert.title}</h3>
          <p
            style={{ margin: 0 }}
            dangerouslySetInnerHTML={{ __html: alert.text }}
          />
        </div>
      </Modal>

      {props.children}

      <ShoppingCart />
    </GuestsContext.Provider>
  );
};

export const useGuests = () => useContext(GuestsContext);