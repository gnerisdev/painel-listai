import styled from 'styled-components';

export const Content = styled('div')({
  margin: '56px auto',
  table: {
    minWidth: 1000
  },
  'td, th': {
    textAlign: 'start'
  }
});

export const ModalContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'start',
  maxWidth: 600,
  '.info': {
      padding: '12px 0',

  },
  strong: {
    fontWeight: 600
  }
});