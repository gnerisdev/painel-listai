import styled from 'styled-components';

export const Header = styled('header')({
  position: 'relative',
  marginBottom: 72
});

export const Nav = styled('nav')({
  width: '100%',
  height: 56,
  display: 'flex',
  justifyContent: 'start',
  position: 'fixed',
  inset: 0,
  padding: '10px 0',
  background: 'var(--primary-color) ',
  zIndex: 9,
});

export const Icon = styled('span')({
  fontSize: 24,
  color: 'white',
  cursor: 'pointer'
});

export const Logo = styled('img')({
  height: 26,
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
});

export const SideMenu = styled('div')({
  height: '100%',
  padding: '24px 16px',
  background: '#ffffff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: 16,
});

export const MenuList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const MenuItem = styled('li')({
  fontSize: 16,
  padding: '12px 0',
  color: 'var(--primary-color) ',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: '#7c3aed',
  },
});
