import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import * as S from './style';

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <S.Header>
      <Container>
        <span className="" />
      </Container>
    </S.Header>
  );
};

export default Header;
