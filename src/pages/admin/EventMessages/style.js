import styled from 'styled-components';

export const Content = styled.div({
  padding: '56px 0'
});

export const ButtonGroup = styled.div({
  display: 'flex',
  gap: '10px',
  marginBottom: '30px',
});

export const SectionTitle = styled.h2({
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '20px',
});

export const Cards = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: 24,
  '@media(min-width: 992px)': {
    gridTemplateColumns: '1fr 1fr',
  },
});

export const Card = styled.div({
  padding: '20px 16px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: '2px solid var(--primary-color)',
  borderRadius: 8,
  p: {
    wordBreak: 'break-word',
    maxWidth: 480
  }
});

export const Info = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  '.data': {
    textAlign: 'end'
  }
});

export const ActionButtons = styled.div({
  display: 'flex',
  gap: '10px',
});

export const ButtonIcon = styled.button({
  border: 'none',
  borderRadius: '50%',
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  color:  'var(--text-white)'
});

export const ModalContent = styled.button({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  marginTop: 24,
  'button': {
    marginTop: 16
  },
  '.row': {
    display: 'flex', 
    gap: 16
  }
});

export const Notfound = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: 16,
  '.icon': {
    fontSize: 80,
    opacity: 0.2
  }
});