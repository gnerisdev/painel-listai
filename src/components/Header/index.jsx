import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from 'contexts/Users';
import Container from 'components/Container';
import logo from 'assets/logo.png';
import * as S from './style';

const Header = ({ background }) => {
  const navigate = useNavigate();
  const { event } = useContext(UsersContext);

  return (
    <S.Header>
      <S.Nav style={event.color ? { background: event.color } : {}}>
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

export default Header;
