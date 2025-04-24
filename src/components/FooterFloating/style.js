import styled from 'styled-components';

export const FooterFloating = styled('footer')({
  width: '100%',
  background: '#ffffff',
  borderTop: '1px solid rgb(223, 219, 219)',
  position: 'fixed',
  bottom: 0,
  zIndex: 9,
  height: 48,
  'div': {
    height: '100%'
  }
});

export const Nav = styled('nav')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%'

});

export const Icon = styled('span')({
  fontSize: 20,
  cursor: 'pointer'
});

export const IconLogo = styled('span')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  'img': {
    width: '100%'
  }
});
