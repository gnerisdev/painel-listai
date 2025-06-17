import styled from 'styled-components';

export const Wrapper = styled('div')({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  background: '#ffffff',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 999,
});

export const SpinnerWrapper = styled('div')({
  position: 'relative',
  width: 120,
  height: 120,
});

export const Spinner = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '8px solid #f3f3f3',
  borderTop: '8px solid #007bff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  zIndex: 1,
});

export const LogoImg = styled('img')({
  width: 80,
  height: 'auto',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 2,
});