import { useGuests } from 'contexts/Guests';
import { ApplicationUtils } from 'utils/ApplicationUtils';
import * as S from './style';

const GiftList = ({ event }) => {
  const { addToCart } = useGuests();
  const handleAddToCart = (item) => addToCart(item, 1);

  return (
    <S.SectionGifts id="gifts">
      <S.TitleSection>Lista de Presentes</S.TitleSection>
      
      <div className="content">
        {event.gifts.map((item) => (
          <div className="gift" key={item.id}>
            <img src={item.imageUrl} alt={`Imagem ilustrativa do presente ${item.name}`} />
            <h3 className="title">{item.name}</h3>
            <p className="price">{ApplicationUtils.formatPrice(item.price)}</p>
            {
              item.isAvailable ? (
                <button onClick={() => handleAddToCart(item)}>
                  PRESENTEAR
                </button>
              ) : (
                <button style={{ background: '#999999', cursor: 'not-allowed' }}>
                  NÃO DISPONÍVEL 
                </button>
              )
            }
          </div>
        ))}
      </div>
    </S.SectionGifts>
  );
};

export default GiftList;