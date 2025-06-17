import styled from 'styled-components';

export const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  gap: 12,
  marginTop: 24,
});

export const PaginationButton = styled('div')({
  padding:'6px 12px',
  border: '1px solid #ccc',
  borderRadius: 4,
  background: '#fff',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  }
});