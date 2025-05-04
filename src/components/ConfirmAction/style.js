import styled from "styled-components";

export const ConfirmBoxOverlay = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 500,
});

export const ConfirmBox = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
  minWidth: '300px',
});

export const ConfirmText = styled('p')({
  fontSize: '18px',
  marginBottom: '20px',
  color: '#333',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
});

export const Button = styled('button')({
  backgroundColor: '#007bff',
  color: 'var( --text-white)',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&.cancel': {
    backgroundColor: '#6c757d',
    '&:hover': {
      backgroundColor: '#545b62',
    },
  },
});