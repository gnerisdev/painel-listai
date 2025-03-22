import styled from 'styled-components';

export const Main = styled('main')({
  maxWidth: 640,
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  padding: '8px 16px 40px'
});

export const Steps = styled('div')((props) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '16px auto 24px',
  maxWidth: 540,

  'span': {
    display: 'block',
    width: '28%',
    height: 5,
    padding: 0,
    background: '#8a8989',
    borderRadius: 5,
    transition: 'background 0.3s ease',
    cursor: 'pointer'
  },

  '.stepCurrent': {
    background: '#432070'
  },
}));


export const Logo = styled('img')({
  width: 200,
  margin: '0 auto'
});

export const Footer = styled('footer')({
  margin: '0 8px',
  position: ''
});