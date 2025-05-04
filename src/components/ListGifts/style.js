import styled from 'styled-components';

export const List = styled('ul')({
  display: 'flex',
  flexFlow: 'column',
  overflowY: 'auto',
  margin: '10px 0',
  width: '100%',
  borderRadius: 10,
  boxShadow: '1px 1px 10px #ccc5c5',
  height: '45vh',
  minHeight: '364px'
});

export const Item = styled('li')({
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '65px 1fr 40px',
  borderBottom: '2px solid #ccc5c5',
  padding: '3px 15px',
  margin: '0 5px'
});

export const Image = styled('img')({
  width: 65,
  height: 65,
  borderRadius: '50%'
});

export const WrapperText = styled('div')({
  textAlign: 'left',
  marginLeft: 12,
  '.title': {
    fontSize: '0.9rem',
    fontWeight: 'bolder',
    display: 'block'
  },

  '.price': {
    fontSize: 13,
    fontWeight: 700,
    color: 'gray',
    display: 'block'
  },

  '@media (min-width: 600px)': {
    '.title': {
      fontSize: '1rem',
    },
    '.price': {
      fontSize: 14,
    }
  },
});

export const Button = styled('button')({
  margin: 0,
  padding: 0,
  borderRadius: '50%',
  border: '2px solid #fff',
  background: '#a9a9a9',
  boxShadow: '1px 1px 10px #0000004d',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:  'var(--text-white)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(.96)'
  }
});
