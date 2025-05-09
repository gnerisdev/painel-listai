import styled from "styled-components";

export const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: '32px 0',
  gap: 15,
});

export const ContainerQuantity = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'end',
});

export const ContainerColumn = styled('div')({
  flexDirection: 'column',
  display: 'flex',
  gap: '10px',
});

export const ContainerButton = styled('div')({
  margin: "0 auto", 
  marginTop: '30px',
  maxWidth: '600px',
});

export const Button = styled('button')({
  width: 40,
  height: 40,
  alignItems: 'center',
  background: 'var(--secondary-color) ',
  outline: 'none',
  color:  'var(--text-white)',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  "@media (max-width: 768px)": {
    marginTop: '20px',
  },
});

export const WrapperButton = styled('div')({
  textAlign: 'end',
  '@media(min-width: 576px)': {
    button: {
      maxWidth: '200px !important'
    },
  }
});