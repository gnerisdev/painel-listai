import styled from 'styled-components';

export const Main = styled('main')({
  margin: 0,
  padding: 0,
});

export const Background = styled('img')({
  maxHeight: 400,
  minHeight: '40vh', 
  objectFit: 'cover',
  width: '100%',
});

export const Content = styled('section')({
  padding: '32px 0'
});

export const WrapperCards = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
  gap: 16,
  margin: '24px 8px',
  '@media(min-width: 1024px)': {
    maxWidth: 700,
    margin: '24px auto'
  },
});

export const WrapperCardsTitle = styled('div')({
  marginTop: 16,
  display: 'grid',
  gap: 16,
  '@media(min-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))'
  },
  div: {
    width: '100%'
  }
});

export const WrapperSidebar = styled('div')({
  display: 'none',
  '@media(min-width: 1024px)': {
    display: 'flex',
    justifyContent: 'end',
  },
});

export const WrapperButton = styled('div')({
  marginTop: 8,
  display: 'grid',
  justifyContent: 'end',
  gridTemplateColumns: 'minmax(0, 340px)'
});
