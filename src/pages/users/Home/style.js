import styled from 'styled-components';

export const Main = styled('main')({
  margin: '0 0 72px',
  padding: 0
});

export const WrapperBackground = styled('div')({
  position: 'relative',
  maxWidth: 1200,
  margin: 'auto',
  button: {
    right: 8,
    top: 8
  }
});

export const Background = styled('img')({
  maxHeight: 400,
  minHeight: '40vh', 
  objectFit: 'cover',
  width: '100%',
  borderEndStartRadius: 5,
  borderEndEndRadius: 5
});

export const WrapperProfile = styled('div')({
  width: '100%',
  display: 'grid',
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
  position: 'relative',
  'img': {
    width: 140,
    height: 140,
    borderRadius: '50%'
  }
});

export const ButtonIcon = styled('button')({
  backgroundColor: '#2E3542', 
  borderRadius: '50%', 
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  border: '2px solid #ffffff',
  cursor: 'pointer',
  position: 'absolute',
  right: -4,
  bottom: 5,
  overflow: 'hidden',
  color:  'var(--text-white)',
  input: {
    width: '100%',
    height: '100%',
    opacity: 0,
    position: 'absolute'
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
});

export const WrapperCards = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
  gap: 16,
  margin: '24px 8px',
  '@media(min-width: 1024px)': {
    maxWidth: 640,
    margin: '24px auto'
  },
});

export const Personalize = styled('div')({
  display: 'grid',
  marginTop: 48
});

export const WrapperCardsTitle = styled('div')({
  marginTop: 16,
  display: 'grid',
  gap: 16,
  '@media(min-width: 1024px)': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
  },
});

export const WrapperSidebar = styled('div')({
  display: 'none',
  '@media(min-width: 1024px)': {
    display: 'flex',
    justifyContent: 'end'
  },
});

export const WrapperButton = styled('div')({
  marginTop: 8,
  display: 'grid',
  justifyContent: 'end',
  gridTemplateColumns: 'minmax(0, 340px)'
});