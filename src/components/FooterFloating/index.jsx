import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import logo from 'assets/logo.png';
import * as S from './style';

const FooterFloating = ({ background }) => {
  const navigate = useNavigate();

  return (
    <S.FooterFloating>
      <Container>
        <S.Nav>
          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-solid fa-comment-dots" 
            style={{ color: '#5d9ce' }}
          />

          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-solid fa-gift" 
            style={{ color: '#eb6f63' }}
          />


          <S.IconLogo
            onClick={() => navigate(-1)}
            style={{ background: '#eb6f63' }}
          >
            <img src={logo} alt="" />
          </S.IconLogo>

          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-solid fa-list" 
            style={{ color: '#5d9ce' }}
          />

          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-regular fa-user" 
            style={{ color: '#ac92eb' }}
          />
        </S.Nav>
      </Container>
    </S.FooterFloating>
  );
};

export default FooterFloating;
