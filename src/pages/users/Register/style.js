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
    background: 'var(--secondary-color) '
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

export const ListEventTypes = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '0 12px',
  margin: '40px 0'
});

export const ItemEventTypes = styled('div')({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'rgba(0,0,0,.87)',
  cursor: 'pointer',
  margin: 12,
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  border: '2px solid transparent', 
  'img': {
    width: 96,
    margin: 'auto'
  },
  '&:hover': {
    border: '2px solid var(--secondary-color) '
  },
  '&.selected': {
    border: '2px solid var(--secondary-color) '
  },
});