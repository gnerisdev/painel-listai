import styled from "styled-components";

export const Main = styled('main')({
  margin: '16px 0'
});

export const FormContainer = styled('div')({
  display: 'grid',
  alignItems: 'start',
  gap: '16px',
  margin: '32px auto 0',
  '@media(min-width: 576px)': {
    gridTemplateColumns: '200px 1fr',
  },
  '.inputs': {
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }
});

export const WrapperButton = styled('div')({
  textAlign: 'end',
  '@media(min-width: 576px)': {
    button: {
      maxWidth: '200px !important'
    },
  }
});