import { useState, useEffect, useRef } from 'react';
import { useGuests } from 'contexts/Guests';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import Input from 'components/Input';
import Button from 'components/Button';
import * as S from './style';

const ShoppingCart = () => {
  const isFirstRender = useRef(true);
  const { event, cartItems, updateQuantity, getTotal, setAlert, apiService } = useGuests();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', email: '' });

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const validation = () => {
    if (!data.name.trim() || !data.email.trim()) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-exclamation-triangle',
        text: `
          Por favor, preencha seu nome e email 
          para prosseguir com o pagamento.
        `
      });

      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setAlert({
        show: true,
        title: 'Atenção!',
        icon: 'fa-solid fa-exclamation-triangle',
        text: `Por favor, preencha um email válido.`
      });

      return false;
    }

    return true;
  }

  const sendPurchaseRequest = async () => {
    if (!validation()) return;
    
    try {
      setLoading(true);

      const items = cartItems.map((item) => ({ id: item.id, quantity: item.quantity }));
      const response = await apiService.post(`/guests/purchase`, {
        items,
        eventId: event.id,
        name: data.name,
        email: data.email,
      });

      const { success, message, paymentLink } = response.data;
      if (!success || !paymentLink) throw new Error(message);

      window.location.href = paymentLink;
    } catch (error) {
      console.log(error)
      setAlert({
        show: true,
        title: 'Erro!',
        icon: 'fa-solid fa-triangle-exclamation',
        text: ApplicationUtils.getErrorMessage(error, 'Erro ao prosseguir pagamento.'),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      if (cartItems.length > 0) setIsCartOpen(true);
      return;
    } 
    
    isFirstRender.current = false;
  }, [cartItems]);

  return (
    (isCartOpen && cartItems.length > 0) ? (
      <S.ModalBackdrop onClick={closeCart}>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          <S.CloseButton onClick={closeCart}>&times;</S.CloseButton>
          <S.Cart>
            <h3>Presentes Selecionados</h3>

            <S.List>
              {cartItems.map((item) => (
                <S.ListItem key={item.id}>
                  <div className="item-info">
                    <img src={item.imageUrl} alt={item.name} style={{ maxWidth: '50px', marginRight: '10px' }} />
                    <span>{item.name}</span>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <div className="show-value">{item.quantity}</div>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <span className="price">{ApplicationUtils.formatPrice(item.price * item.quantity)}</span>
                  </div>
                </S.ListItem>
              ))}
            </S.List>
            <div className="total">
              Total: <strong>{ApplicationUtils.formatPrice(getTotal())}</strong> 
            </div>
            <S.Inputs>
              <Input
                label="Seu nome"
                name="name"
                value={data.name}
                onChange={value => setData({ ...data, name: value})}
              />
              <Input
                label="Seu email"
                name="email"
                value={data.email}
                onChange={value => setData({ ...data, email: value})}
              />
            </S.Inputs>

            <S.WrapperButton>
              <Button 
                onClick={sendPurchaseRequest} 
                text="Enviar Presentes" 
                maxWidth={380}
                background="var(--primary-color)"
                isLoading={loading} 
                margin="auto"
              />
            </S.WrapperButton>
          </S.Cart>
        </S.ModalContent>
      </S.ModalBackdrop>
    ) : (
      cartItems.length > 0 && 
      <S.ButtonOpen className="fa-solid fa-cart-shopping" onClick={openCart} />
    )
  );
};

export default ShoppingCart;