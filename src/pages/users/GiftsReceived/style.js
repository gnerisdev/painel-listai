import styled from 'styled-components';

export const Content = styled('div')({
  margin: '40px auto',
  maxWidth: 800 
});

export const CardContainer = styled('div')({
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  alignItems: 'center',
});

export const Card = styled('div')((props) => ({
  flex: 1,
  padding: '20px',
  border: `1px solid #c6c6c6`,
  borderRadius: '10px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const Amount = styled('div')({
  fontSize: '24px',
  fontWeight: 'bold',
});

export const Label = styled('div')({
  fontSize: '14px',
  color: '#777',
});

export const WithdrawButton = styled('button')({
  padding: '10px 20px',
  backgroundColor: '#F06257',
  color: 'var( --text-white)',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  height: '50px',
});

export const RadioGroup = styled('div')({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  marginBottom: '20px',
});

export const Divider = styled('hr')({
  border: 'none',
  borderTop: '1px solid #ccc',
  marginBottom: 32
});

export const GiftCard = styled('div')({ 
  background: '#f9f9f9',
  borderRadius: 8,
  padding: 16,
  marginBottom: 12,
  border: '1px solid #eee',
  position: 'relative'
});

export const GuestName = styled('h3')({ 
  marginBottom: 16
});

export const DateText = styled('p')({
  color: '#777',
  marginBottom: 16,
});

export const ItemsContainer = styled('div')({
  marginTop: 16,
  paddingLeft: 16,
});

export const ItemsTitle = styled('h4')({
  fontWeight: 'bold',
  marginBottom: 8,
});

export const ItemText = styled('p')({
  color:' #333',
  marginBottom: 8,
});

export const TotalPrice = styled('p')({
  fontWeight: 'bold',
  marginTop: 16,
  marginLeft: 'auto',
  textAlign: 'right'
});

export const StatusText = styled('p')({
  color: 'green',
  marginTop: 4,
  textTransform: 'uppercase',
  position: 'absolute',
  top: 8,
  right: 16
});

export const GiftImage = styled('img')({
  width: 45,
  height: 45,
  marginRight: 8,
  bordeRadius: 8,
  objectFit: 'cover'
});