import { useGuests } from 'contexts/Guests';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import * as S from './style';

const GiftList = ({ event }) => {
  const { addToCart } = useGuests();
  const handleAddToCart = (item) => addToCart(item, 1);

  return (
    <S.SectionGifts>
      <div className="content">
        {event.gifts.map((item) => (
          <div className="gift" key={item.id}>
            <img src={item.imageUrl} alt={`Imagem ilustrativa do presente ${item.name}`} />
            <h3 className="title">{item.name}</h3>
            <p className="price">{ApplicationUtils.formatPrice(item.price)}</p>
            <button 
              style={{ background: event?.color }} 
              onClick={() => handleAddToCart(item)}
            >
              PRESENTEAR
            </button>
          </div>
        ))}
      </div>
    </S.SectionGifts>
  );
};

export default GiftList;