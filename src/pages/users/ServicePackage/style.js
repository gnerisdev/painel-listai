import styled from 'styled-components';

export const Card = styled('div')({
  backgroundColor: '#4B1D82',
  color: 'white',
  padding: '30px 20px',
  borderRadius: '20px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  width: 220
});

export const Icon = styled('div')({
  fontSize: '30px',
  marginBottom: '15px',
});

export const Title = styled('h3')({
  margin: '0',
  fontSize: '18px',
  fontWeight: 'bold',
});

export const Description = styled('p')({
  fontSize: '14px',
  margin: '10px 0',
});

export const Tag = styled('span')({
  backgroundColor: 'white',
  color: '#4B1D82',
  padding: '5px 10px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '12px',
  marginTop: '10px',
});

export const ServicesContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  marginTop: 16,
  flexWrap: 'wrap'
});

export const ButtonService= styled('button')({
  backgroundColor: 'white',
  color: '#4B1D82',
  padding: '8px 12px',
  borderRadius: 5,
  fontWeight: 'bold',
  fontSize: 14,
  marginTop: '10px',
  cursor: 'pointer'
});


export const ContentModal = styled('div')({
  maxHeight: '90vh',
  
});