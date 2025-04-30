import { Link } from 'react-router-dom';
import * as S from './style';

const SidebarMenu = ({ menuItems, userName, message }) => {
  return (
    <S.Sidebar>
      <S.UserSection>
        <S.Avatar>GN</S.Avatar>
        <div>
          <S.UserName>{userName}</S.UserName>
          <S.WelcomeText>Bem-vindo!</S.WelcomeText>
        </div>
      </S.UserSection>
      <S.MenuList>
        {menuItems.map((item, index) => (
          <S.MenuItem key={index}>
            <Link to={item.link || ""} style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className={item.icon + " icon"}></span> {item.label}
            </Link>
          </S.MenuItem>
        ))} 
      </S.MenuList>
    </S.Sidebar>
  );
};

export default SidebarMenu;
