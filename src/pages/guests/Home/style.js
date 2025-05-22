import styled from 'styled-components';

export const Header = styled.header({
  position: 'fixed',
  width: '100%',
  height: 56,
  zIndex: 1,
  background: '#fff',
  inset: 0,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

export const Nav = styled.nav({
  height: '52px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const Logo = styled.div({
  img: { height: '32px'},
});

export const MenuButton = styled.button({
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
});

export const SideMenu = styled('div')({
  position: 'fixed',
  top: 0,
  width: '250px',
  height: '100vh',
  background: '#fff',
  boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  transition: 'left 0.3s ease-in-out',
  zIndex: 1050,
  left: -250,
  '&.open': {
    left: 0,
  },
  ul: {
    listStyle: 'none',
    padding: '20px',
    margin: 0,
  },
  li: {
    marginBottom: '16px',
  },
  a: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
  },
});

export const Main = styled('main')({
  margin: 0,
  padding: 0,
});

export const Background = styled('img')({
  maxHeight: 400,
  minHeight: '40vh',
  objectFit: 'cover',
  maxWidth: 1168,
  margin: '56px auto auto',
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
  img: {
    width: 125,
    height: 125,
    borderRadius: '50%',
  },
});

export const EventTitle = styled('div')({
  textAlign: 'center',
  marginTop: 16,
  h1: {
    fontSize: 28,
    margin: '',
    fontWeight: '600',
  },
  h2: {
    fontSize: 14,
    fontWeight: 'normal'
  },
});

export const SectionIntroduction = styled('section')({
  padding: '40px 0',
  maxWidth: 1100,
  margin: 'auto',
  '.content': {
    display: 'grid',
    justifyContent: 'center',
    '> *': {
      margin: 'auto',
      width: '100%',
      maxWidth: 450,
    },
    '@media(min-width: 992px)': {
      gridTemplateColumns: '1fr 1fr'
    },
    'p': {
      textAlign: 'left',
      textAlignLast: 'left',
      minHeight: '200px',
      '&:after': {
        content: '""',
        display: 'inline-block',
        width: '100%'
      }
    }
  }
});

export const TitleSection = styled('h2')({
  marginBottom: 5,
  fontSize: 22,
  textAlign: 'center',
});

export const WrapperForm = styled('div')({
  display: 'grid',
  gap: 16
});

export const Footer = styled('footer')({
  height: 200,
  padding: '35px 0',
  textAlign: 'center',
  color:  'var(--text-white)',
});
