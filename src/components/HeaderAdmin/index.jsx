import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import logo from 'assets/logo.png';
import * as S from './style';

const HeaderAdmin = ({ background }) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <S.Nav style={{ background }}>
        <Container>
          <S.Icon 
            onClick={() => navigate(-1)}
            className="fa-solid fa-arrow-left" 
          />
          <S.Logo src={logo} />
        </Container>
      </S.Nav>
    </S.Header>
  );
};

export default HeaderAdmin;
