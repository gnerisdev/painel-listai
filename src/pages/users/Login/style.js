import styled from 'styled-components';

export const Main = styled('main')({
  maxWidth: 400,
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  padding: '8px 16px 40px'
});

export const Logo = styled('img')({
  width: 220,
  margin: '0 auto'
});

export const Subtitle = styled('h2')({
  fontSize: '1.1rem'
});

export const Text = styled('p')({
  fontSize: '0.9rem',
  color: 'gray'
});

export const TextSmall = styled('p')({
  fontSize: '0.8rem',
  color: 'gray',
  margin: '16px 0 0'
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  margin: '1.6rem 0',
  padding: '0 6px'
});

export const Line = styled('div')({
  display: 'flex',
  margin: '20px 10px',
  gap: 8,
 'span:first-child': {
    width: '100%',
    height: '1px',
    marginTop: '9px',
    background: '#d3d3d3',
    display: 'block',
  },
  'span:nth-child(2)': {
    fontSize: '14px',
    color: 'gray',
    display: 'block',
  },
  'span:nth-child(3)': {
    width: '100%',
    height: '1px',
    marginTop: '9px',
    background: '#d3d3d3',
    display: 'block',
  }
});

export const Link = styled('a')({
  textDecoration: 'none',
  color:'#00f',
  cursor: 'pointer'
});

export const ForgetPass = styled('a')({
  margin: '-12px 0 0 5px',
  fontSize: 12,
  color: '#616161',
  textDecoration: 'none',
  textAlign: 'left'
});
