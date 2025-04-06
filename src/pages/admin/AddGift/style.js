import styled from "styled-components";

export const ContainerRow = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '30px',
  justifyContent: 'center',
  maxWidth: '1200px',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});
export const ContainerQuantity = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  alignItems: 'center',
  "@media (max-width: 768px)": {
    display: 'inline-block',
  },
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
  width: 45,
  height: 45,
  alignItems: 'center',
  background: '#432070',
  outline: 'none',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  "@media (max-width: 768px)": {
    marginTop: '20px',
  },
});

