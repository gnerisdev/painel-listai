import { useNavigate, useLocation } from 'react-router-dom'; // importe useLocation
import { useAdmin } from 'contexts/Admin';
import Container from 'components/Container';
import logo from 'assets/logo.png';
import defaultAvatar from 'assets/default-avatar.webp'
import * as S from './style';

const HeaderAdmin = ({ background }) => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { admin } = useAdmin();

  const isHome = location.pathname === '/';

  return (
    <S.Header>
      <S.Nav style={{ background }}>
        <Container>
          <div className="content">
            {!isHome 
              ? (
                <S.Icon 
                  onClick={() => navigate(-1)}
                  className="fa-solid fa-arrow-left" 
                />
              ) : (
                <S.Icon 
                  onClick={() => navigate(-1)}
                  className="fa-solid fa-home" 
                />
              )
            }

            <div onClick={() => navigate('home')}>
              <S.Logo src={logo} />
            </div>

            <S.WrapperProfile>
              <h6>{admin.firstName}</h6>
              <img src={defaultAvatar} alt="Imagem perfil" />
            </S.WrapperProfile>
          </div>
        </Container>
      </S.Nav>
    </S.Header>
  );
};

export default HeaderAdmin;
