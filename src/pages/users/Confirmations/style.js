import styled from 'styled-components';

export const Content = styled.div({
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
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

export const GuestCard = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 0',
  borderBottom: '1px solid #ccc',
});

export const GuestInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
});

export const Tag = styled.span({
  backgroundColor: '#FFCE4B',
  color:  'var(--text-white)',
  padding: '5px 10px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: 'bold',
  alignSelf: 'start',
  marginTop: '10px',
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