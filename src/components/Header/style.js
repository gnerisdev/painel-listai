import styled from 'styled-components';

export const Header = styled('header')({
  position: 'relative',
  background: 'transparent'
});

export const Nav = styled('nav')({
  width: '100%',
  height: 56,
  display: 'flex',
  justifyContent: 'start',
  position: 'fixed',
  inset: 0,
  padding: '10px 0',
  background: '#1e242d',
  zIndex: 9,
});

export const Icon = styled('span')({
  fontSize: 24,
  color: '#ffffff',
  cursor: 'pointer'
});

export const Logo = styled('img')({
  height: 26,
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
});