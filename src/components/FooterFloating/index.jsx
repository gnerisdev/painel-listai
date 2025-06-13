import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import * as S from './style';

const FooterFloating = () => {
  const navigate = useNavigate();
  return (
    <>
    <div style={{ height: 40  }}></div>
    <S.FooterFloating>
      <Container>
        <S.Nav>
          <S.Icon 
            className="fa-solid fa-gift" 
            style={{ color: 'var(--primary-color)' }}
            onClick={() => navigate('/gifts-received')}
          />

          <S.Icon 
            className="fa-solid fa-list" 
            style={{ color: 'var(--primary-color)' }}
            onClick={() => navigate('/confirmations')}
          />

          <S.Icon 
            className="fa-solid fa-envelope" 
            style={{ color: 'var(--primary-color)' }}
            onClick={() => navigate('/messages')}
          />

          <S.Icon 
            className="fa-solid fa-right-from-bracket"
            style={{ color: 'var(--primary-color)' }}
            onClick={() => {
              localStorage.removeItem('userToken');
              localStorage.removeItem('userId');
              window.location.reload();
            }}
          />
        </S.Nav>
      </Container>
    </S.FooterFloating>
    </>
  );
};

export default FooterFloating;
