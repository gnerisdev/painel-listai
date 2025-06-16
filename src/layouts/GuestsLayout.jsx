import { Outlet, useLocation } from 'react-router-dom';

const GuestsLayout = (props) => {
  const location = useLocation(); 
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default GuestsLayout;
