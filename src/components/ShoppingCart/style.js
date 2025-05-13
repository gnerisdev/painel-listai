import styled from 'styled-components';

export const Cart = styled('div')({
  marginTop: 20,
  borderRadius: 8,
  padding: '0 8px',
  width: '100%',
  '.total': {
    marginTop: 15,
    paddingTop: 10,
    borderTop: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'end',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    width: '100%',
    padding: '10px 15px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: '1em',
    marginLeft: 'auto',
    '&:hover': {
      opacity: 0.9,
    }
  },
});

export const List = styled('ul')({
  listStyle: 'none',
  maxHeight: '40vh',
  overflow: 'auto'
});

export const ListItem = styled('li')({
  padding: '10px 0',
  borderBottom: '1px solid #eee',
  '@media (min-width: 576px)': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '&:lastChild': {
    borderBottom: 'none',
  },
  '.item-info': {
    display: 'flex',
    alignItems: 'center',
  },
  '.item-actions': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    width: 'fit-content',
    button: {
      background: 'none',
      color: '#000',
      border: 'none',
      cursor: 'pointer',
      marginLeft: 10,
      fontSize: '0.9em',
      padding: 5,
      borderRadius: 4,
    },
    '.quantity-control': {
      display: 'flex',
      alignItems: 'center',
      '.show-value': {
        border: '1px solid #c6c6c6',
        width: 32,
        height: 24,
        textAlign: 'center'
      },
      button: {
        padding: '5px 8px',
        margin: '0 5px',
        borderRadius: 4,
      },
      'input[type="number"]': {
        width: 40,
        padding: 5,
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: 4,
      }
    },
    '.price': {
      fontWeight: 'bold',
    }
  }
});

export const ButtonOpen = styled('button')({
  position: 'fixed',
  left: '50%',
  bottom: 16,
  transform: 'translateX(-50%)',
  width: 40,
  height: 40,
  background: 'var(--primary-color)'
});

export const ModalBackdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
});

export const ModalContent = styled('div')({
  background: 'white',
  maxWidth: 600,
  width: '100%',
  padding: 16,
  margin: '0 16px',
  borderRadius: 8,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  position: 'relative'
});

export const CloseButton = styled('button')({
  position: 'absolute',
  top: 10,
  right: 10,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1.2em',
  color: '#555',
});

export const Inputs =  styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: '0 8px'
});