import styled from 'styled-components';

export const WrapperInput = styled('div')({
  padding: '10px 8px',
  background: '#fff',
  alignItems: 'center',
  display: 'flex',
  boxShadow: '1px 1px 10px #ccc5c5',
  width: '100%', 
  border: 'none',
  borderRadius: '5px',
});

export const Input = styled('input')({
  background: 'transparent',
  width: '100%', 
  border: 'none',
  outline: 'none'
});

export const Label = styled('label')({
  color: '#000',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left'
});

export const WrapperIcons = styled('div')({
  display: 'flex',
  gap: 8
});


export const Check = styled('img')({
  width: 18,
  height: 18
});

export const MessageError = styled('p')({
  color: '#fe6446',
  textAlign: 'left',
  fontSize: 12,
  margin: '4px 0'
});