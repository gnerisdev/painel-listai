import styled from 'styled-components';

export const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  margin: '1.6rem 0',
  padding: '0',
  width: '100%',
  '@media(min-width: 440px)': {
    maxWidth: 520,
    minWidth: 400
  }
});