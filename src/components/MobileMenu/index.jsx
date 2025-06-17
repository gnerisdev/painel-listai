import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import Modal from 'components/Modal';
import logo from 'assets/logo.png';
import * as S from './style';

const Header = ({ menuItems }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <S.Header>
      <S.Nav>
        <Container>
          <S.Icon
            className="fa-solid fa-bars"
            onClick={() => setMenuOpen(true)}
          />
          <S.Logo src={logo} />
        </Container>
      </S.Nav>
      <Modal active={menuOpen} updateShow={setMenuOpen} background="#fff">
        <S.SideMenu>
          <S.MenuList>
            {menuItems.map((item) => (
              <S.MenuItem
                key={item.path}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(item.path);
                }}
              >
                {item.label}
              </S.MenuItem>
            ))}
          </S.MenuList>
        </S.SideMenu>
      </Modal>
    </S.Header>
  );
};

export default Header;
