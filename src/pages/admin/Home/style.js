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

export const WrapperProfile = styled('div')({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  justifyContent: 'center',
  textAlign: 'center',
  '@media(min-width: 1024px)': { 
    gridTemplateColumns: '180px 1fr 1fr',
  },
})

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
  textAlign: 'start',
  'h2': {
    fontSize: '1.5rem',
    fontWeight: 'bolder'
  },
  'h6': {
    fontSize: '1rem',
    fontWeight: 400
  },
});

export const Content = styled('section')({
  display: 'grid',
  '@media(min-width: 1024px)': {
    gridTemplateColumns: '1fr 280px',
  },
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

export const Personalize = styled('div')({
  display: 'grid',
});

export const WrapperCardsTitle = styled('div')({
  display: 'grid',
  gap: 16,
  '@media(min-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, auto)'
  },
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
