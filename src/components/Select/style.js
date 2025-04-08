import styled from 'styled-components';

export const WrapperInput = styled('div')({
  background: '#fff',
  alignItems: 'center',
  display: 'flex',
  boxShadow: '1px 1px 10px #ccc5c5',
  width: '100%', 
  border: 'none',
  borderRadius: '5px',
  position: 'relative'
});

export const Select = styled('select')({
  background: 'transparent',
  width: '100%', 
  border: 'none',
  outline: 'none',
  padding: '10px 8px',
});

export const Label = styled('label')({
  color: '#000',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0 5px',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left'
});

export const WrapperIcons = styled('div')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  right: 8,
  color: '#a6a6a6',
  'span': {
    fontSize: 8
  }
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