import styled from 'styled-components';

export const WrapperForm = styled('div')({
  width: '100%', 
  minWidth: 400,
  maxWidth: 450,
  display: 'flex',
  flexDirection: 'column',
  gap: 16
});

export const TitleModal = styled('h2')({
  color: '#000', 
  marginBottom: 8, 
  display: 'flex', 
  alignItems: 'center',
  gap: 8
});

export const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #333;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  color: #666;
`;
