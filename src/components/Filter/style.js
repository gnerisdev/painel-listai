import styled from 'styled-components';

export const WrapperSearch = styled('div')({
  background: '#f9f9f9',
  width: '100%',
  maxWidth: 800,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  padding: '16px',
  borderRadius: 5,
});

export const WrapperInput = styled('div')({
  display: 'grid',
  flexWrap: 'wrap',
  gap: '0.8rem',
  padding: '0',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  '@media (max-width: 768px)': {  
    gridTemplateColumns: '1fr',
  },
});

export const SearchField = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const Input = styled('input')({
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
});

export const Select = styled('select')({
  padding: '8px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  outline: 'none',
});

export const SearchButton = styled('button')({
  padding: '10px 15px',
  fontSize: '14px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

export const WrapperButton = styled('div')({
  marginTop: 16,
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
  'button': {
    maxWidth: 200
  }
});