import styled from 'styled-components';

export const WrapperInput = styled('div')({
  padding: '10px 8px',
  background: '#fff',
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr',
  boxShadow: '1px 1px 10px #ccc5c5',
  width: '100%', 
  border: 'none',
  borderRadius: '5px',
  color: 'var(--text-color)'
});

export const Input = styled('input')({
  background: 'transparent',
  width: '100%', 
  border: 'none',
  outline: 'none'
});

export const Label = styled('label')({
  color:  'var(--text-color)',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left'
});

export const MessageError = styled('p')({
  color: '#fe6446',
  textAlign: 'left',
  fontSize: 12,
  margin: '4px 0'
});

export const PreviewFile = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: '#f5f5f5',
  padding: '8px',
  borderRadius: '8px',
  fontSize: '14px',
  color: 'var(--text-color)',
  position: 'relative',
  width: 'fit-content'
});

export const ButtonClose = styled('button')({
  position: 'absolute',
  top: 0,
  right: 0,
  background: 'rgba(0,0,0,0.6)',
  color: 'var( --text-white)',
  border: 'none',
  borderRadius: '50%',
  width: 24,
  height: 24,
  cursor: 'pointer',
});