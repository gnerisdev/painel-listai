import styled from 'styled-components';

export const WrapperInput = styled('div')({
  padding: '3px 8px 3px 3px',
  background: '#fff',
  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr 18px',
  boxShadow: '1px 1px 10px #ccc5c5',
  width: '100%', 
  border: 'none',
  borderRadius: '5px',
});

export const WrapperUrl = styled('div')({
  background: '#efefef',
  color: '#696969',
  borderRadius: '5px',
  padding: '7px 6px',
  marginRight: 4
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

export const WrapperIcons = styled('div')({
  display: 'flex',
  gap: 8
});

export const Check = styled('span')({
  width: 18,
  height: 18,
});

export const MessageError = styled('p')({
  color: '#fe6446',
  textAlign: 'left',
  fontSize: 12,
  margin: '4px 0'
});