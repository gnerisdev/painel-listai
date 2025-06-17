import { useSearchParams } from 'react-router-dom';
import NotFoundData from 'components/NotFoundData';
import Button from 'components/Button';
import * as S from './style';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const event = searchParams.get('event');

  return (
    <S.Main>
      <NotFoundData 
        textSize="1.2rem"
        iconSize="120px"
        text="Presente enviado com sucesso! Em breve você receberá um e-mail de confirmação."
        icon="fa-solid fa-gift"
        active={true}
      />

      <Button
        text="Voltar ao evento"
        maxWidth={240}
        onClick={() => (window.location.href = `https://site.listai.com.br/${event}`)}
      />
    </S.Main>
  );
};

export default CheckoutSuccess;