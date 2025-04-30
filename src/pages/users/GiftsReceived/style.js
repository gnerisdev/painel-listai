import styled from 'styled-components';

export const Content = styled('div')({
  marginTop: 80,
  padding: '20px',
  maxWidth: '800px',
  margin: '0 auto',
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
  border: `1px solid ${props.borderColor}`,
  borderRadius: '10px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const Amount = styled('div')({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
});

export const Label = styled('div')({
  fontSize: '14px',
  color: '#777',
});

export const WithdrawButton = styled('button')({
  padding: '10px 20px',
  backgroundColor: '#F06257',
  color: '#fff',
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

export const RadioButton = styled('input')({
  marginRight: '8px',
});

export const RadioLabel = styled('label')({
  fontSize: '14px',
  color: '#333',
});

export const SectionTitle = styled('h2')({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
});

export const Divider = styled('hr')({
  border: 'none',
  borderTop: '1px solid #ccc',
});
