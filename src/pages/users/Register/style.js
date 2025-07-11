import styled from 'styled-components';

export const Main = styled('main')({
  maxWidth: 640,
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  padding: '8px 16px 40px'
});

export const Logo = styled('img')({
  width: 200,
  margin: '0 auto'
});

export const Footer = styled('footer')({
  margin: '0 8px',
  position: ''
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  margin: '1.6rem 0',
  padding: '0 6px'
});

export const Row = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '> :nth-child(1)': {
    marginRight: 8,
  },
  '> :nth-child(2)': {
    marginLeft: 8,
  }
});