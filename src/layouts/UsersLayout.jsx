import { Outlet } from 'react-router-dom';
import FooterFloating from 'components/FooterFloating';

const UsersLayout = (props) => {
  return (
    <>
      <Outlet />
      <FooterFloating />
    </>
  );
};

export default UsersLayout;
