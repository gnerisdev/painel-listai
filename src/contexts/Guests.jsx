import { createContext, useState, useMemo, useContext } from 'react';
import { ApiService } from 'services/api.service';
import ShoppingCart from 'components/ShoppingCart';
import Modal from 'components/Modal';

export const GuestsContext = createContext();

export const GuestsProvider = (props) => {
  const apiService = useMemo(() => new ApiService({ module: 'users', auth: false }), []);
  const [alert, setAlert] = useState({ show: false, icon: '', title: '', text: '' });
  const [cartItems, setCartItems] = useState([]);
  const [event, setEvent] = useState(null);

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
    if(newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: parseInt(newQuantity, 10) || 1 } : item
    );

    setCartItems(updatedCartItems);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <GuestsContext.Provider
      value={{
        alert,
        setAlert,
        apiService,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        event,
        setEvent,
      }}
    >
      <Modal
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