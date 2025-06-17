import styled from 'styled-components';

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

export const ButtonLink = styled('button')({
  background: 'none',
  border: 'none',
  color: 'var(--danger-color)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  margin: '4px auto 0',
});