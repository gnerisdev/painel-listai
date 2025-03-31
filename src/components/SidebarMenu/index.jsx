import * as S from './style';

const SidebarMenu = ({ menuItems, userName, message }) => {
  return (
    <S.Sidebar>
      <S.UserSection>
        <S.Avatar>GN</S.Avatar>
        <S.UserName>{userName}</S.UserName>
        <S.WelcomeText>Bem-vindo!</S.WelcomeText>
      </S.UserSection>
      <S.MenuList>
        {menuItems.map((item, index) => (
          <S.MenuItem key={index}>
            {/* {item.icon} */}
            <span className={item.icon}></span>
            {item.label}
          </S.MenuItem>
        ))}
      </S.MenuList>
    </S.Sidebar>
  );
};

export default SidebarMenu;