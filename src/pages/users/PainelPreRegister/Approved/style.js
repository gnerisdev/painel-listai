import styled from 'styled-components';

export const Main = styled('main')({
  maxWidth: 640,
  margin: '0 auto',
  textAlign: 'center',
  width: '100%',
  padding: '8px 0'
});

export const ContentInfo = styled('div')({
  maxWidth: 640,
  margin: '32px auto 0',
  textAlign: 'start',
  width: '100%',
});

export const Logo = styled('img')({
  width: 200,
  margin: '0 auto'
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  margin: '1.6rem 0',
});

export const Label = styled('label')({
  color:  'var(--text-color)',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0 5px',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left',
});

export const LabelOption = styled('label')({
  display: 'grid',
  gridTemplateColumns: '24px 1fr',
  textAlign: 'start',
  gap: '0.9rem 0.1rem',
  fontSize: '0.9rem',
  color: 'var(--text-color)',
  cursor: 'pointer',
  marginBottom: 8,
});

export const Checkbox = styled('input')({
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  border: '1px solid var(--primary-color)',
  appearance: 'none',
  outline: 'none',
  borderRadius: '4px',
  position: 'relative',

  '&:checked': {
    backgroundColor: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
  },

  '&:checked::after': {
    content: '""',
    position: 'absolute',
    top: '2px',
    left: '5px',
    width: '4px',
    height: '8px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  },
});

export const ListEventTypes = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  padding: '0 12px',
});

export const ItemEventTypes = styled('div')({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'rgba(0,0,0,.87)',
  cursor: 'pointer',
  margin: 4,
  boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  border: '2px solid transparent', 
  'img': {
    width: 40,
    margin: 'auto'
  },
  '&:hover': {
    border: '2px solid var(--secondary-color) '
  },
  '&.selected': {
    border: '2px solid var(--secondary-color) '
  },
});

export const WhatsAppButton = styled('a')({
  display: 'inline-block',
  marginTop: '16px',
  padding: '12px 24px',
  backgroundColor: '#25D366',
  color: '#fff',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  textAlign: 'center',

  '& i': {
    marginRight: '8px',
    fontSize: '18px',
  },

  '&:hover': {
    backgroundColor: '#1ebe5d',
  },
});
