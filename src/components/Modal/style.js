import styled from 'styled-components'

export const Modal = styled('div')({
  background: 'rgba(0, 0, 0, 0.6)', 
  height: '100vh',
  width: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  inset: 0,
  opacity: 0,
  visibility: 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  zIndex: 10,
  
  '&.show': {
    opacity: 1,
    visibility: 'visible',
  },

  '&.hide': {
    opacity: 0,
    visibility: 'hidden',
  },
});

export const Content = styled('div')({
  background: '#432070',
  width: 'fit-content',
  height: 'fit-content',
  padding: '32px 16px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  margin: 'auto',
  minWidth: 160,
  color: '#ffffff',
  position: 'relative',
  transform: 'scale(0.9)',
  transition: 'transform 0.3s ease',
  boxShadow: '0 11px 15px -7px rgba(0, 0, 0, .2), 0 24px 38px 3px rgba(0, 0, 0, .14), 0 9px 46px 8px rgba(0, 0, 0, .12)',
  zIndex: 1,
  overflow: 'auto',

  '&.show': {
    transform: 'scale(1)',
  },

  '&.hide': {
    transform: 'scale(0.9)',
  },
});

export const ButtonClose = styled('div')({
  width: 'fit-content',
  height: 'fit-content',
  display: 'flex',
  position: 'absolute',
  top: 16,
  right: 16,
  color: '#ffffff',
  cursor: 'pointer'
});
