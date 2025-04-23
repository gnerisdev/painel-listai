
import styled from 'styled-components';

export const Main = styled('main')({
  margin: 0,
  padding: 0
});

export const Background = styled('img')({
  maxHeight: 400,
  minHeight: '40vh', 
  objectFit: 'cover',
  width: '100%',
});

export const WrapperProfile = styled('div')({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  justifyContent: 'center',
  textAlign: 'center',
  '@media(min-width: 1024px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
});

export const Avatar = styled('div')({
  width: 'fit-content',
  height: 'fit-content',
  margin: '-63px auto 0',
  boxShadow: '0 0 2px #a0a6b7',
  borderRadius: '50%',
  border: '8px solid #ffffff',
  'img': {
    width: 125,
    height: 125,
    borderRadius: '50%'
  }
});

export const AvatarTitle = styled('div')({
  margin: '2rem',
  textAlign: 'center',
  
  'h1': {
    fontSize: '2rem',
    fontWeight: 'bolder',
    color: '#A8D5A1',
  },
  'h2': {
    fontSize: '1.5rem',
  },
  
});


export const TextContainer = styled('div')({
  display: 'grid',
  padding: '1rem 0',
  textAlign: 'left',
  justifyContent: 'center',
  'h2': {
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#A8D5A1',

  },
  'p': {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1rem',
    textAlign: 'left'

  },
  '@media(max-width: 1180px)': {
    margin: '0 auto',      
    maxWidth: '800px',     

    'h2': {
      fontSize: '2.2rem'
    },
    'p': {
      fontSize: '1.1rem'
    }
  }
});