import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import * as S from './style';

const FooterFloating = () => {
  const navigate = useNavigate();
  return (
    <S.FooterFloating>
      <Container>
        <S.Nav>
          <S.Icon 
            onClick={() => navigate('/messages')}
            className="fa-solid fa-comment-dots" 
            style={{ color: '#5d9ce' }}
          />

          <S.Icon 
            onClick={() => navigate('/gifts-received')}
            className="fa-solid fa-gift" 
            style={{ color: '#5d9ce' }}
          />

          <S.Icon 
            onClick={() => navigate('/confirmations')}
            className="fa-solid fa-list" 
            style={{ color: '#5d9ce' }}
          />

          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-regular fa-user" 
            style={{ color: '#5d9ce' }}
          />
        </S.Nav>
      </Container>
    </S.FooterFloating>
  );
};

export default FooterFloating;
