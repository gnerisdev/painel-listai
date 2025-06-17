import styled from 'styled-components';

export const Main = styled('main')({
  margin: '56px auto'
});

export const Content = styled('div')({
  marginRop: '2rem',
  maxWidth: 800,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 16
});

export const ContentModal = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  textAlign: 'center',
  width: '100%',
  '@media (min-width: 576px)': {
    width: 400
  }
});