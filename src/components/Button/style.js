import styled from 'styled-components';

export const Button = styled('button')({
  width: '100%',
  height: 45,
  alignItems: 'center',
  background: '#432070',
  borderRadius: 5,
  outline: 'none',
  color: '#ffffff',
  fontSize: '0.94rem',
  textTransform: 'uppercase',
  border: 'none',
  fontWeight: 700,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(.96)'
  }
});