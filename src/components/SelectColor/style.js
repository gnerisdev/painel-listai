import styled from "styled-components";

export const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  gap: 8,
});

export const Content = styled('div')({
  display: 'flex',
  gap: 16,
});

export const Option = styled('div')({
  width: 28,
  height: 28,
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    transform: 'scale(1.1)'
  },
  '.selected': {
    border: '1px solid #ffffff'
  }
});

export const Arrow = styled('button')({
  background: 'none',
  border: 'none',
  fontSize: 24,
  cursor: 'pointer',
  padding: 8,
  '&:hover': { color: '#666' }
});

export const Label = styled('label')({
  fontSize: 14,
  fontWeight: 'bold'
});

export const MessageError = styled('span')({
  color: '#fe6446',
  fontSize: 12,
  margin: '4px 0',
});