import styled from 'styled-components';

export const Header = styled('header')({
  position: 'relative',
  background: 'transparent',
  color: '#fff',
  marginBottom: 72,
  '.content': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export const Nav = styled('nav')({
  width: '100%',
  height: 56,
  display: 'flex',
  justifyContent: 'space-between',
  position: 'fixed',
  inset: 0,
  padding: '10px 0',
  background: 'var(--primary-color) ',
  zIndex: 9,
});

export const Icon = styled('span')({
  fontSize: 24,
  color:  'var(--text-white)',
  cursor: 'pointer'
});

export const Logo = styled('img')({
  height: 26,
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'pointer'
});

export const WrapperProfile = styled('div')({
  display: 'flex',
  color: '#ffffff',
  alignItems: 'center',
  gap: 8,
  img: {
    height: 38,
    width: 38,
    borderRadius: '50%'
  },
  h6: {
    fontSize: '1rem',
    display: 'none',
    '@media (min-width: 578px)': {
      display: 'block'
    },
  }
})

export const Profile = styled('div')({
  height: 26,
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
});

