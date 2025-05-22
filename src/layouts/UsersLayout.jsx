import { Outlet, useLocation } from 'react-router-dom';
import FooterFloating from 'components/FooterFloating';
import Header from 'components/Header';

const UsersLayout = (props) => {
  const location = useLocation(); 
  const isHome = location.pathname === '/' || location.pathname === '/home';
  
  return (
    <>
      {!isHome && <Header />}
      <Outlet />
      <FooterFloating />
    </>
  );
};

export default UsersLayout;
