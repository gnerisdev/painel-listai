import styled from 'styled-components';

export const Content = styled('div')({
  margin: '24px 0'
});

export const WrapperFilter = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  margin: '24px 0'
});

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

export const Card =  styled('div')({
maxWidth: 400,
  display: 'flex',
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: 16,
  marginBottom: 16,
  background: '#f9f9f9',
});

export const CardIcon =  styled('div')({
  marginRight: 16,
  fontSize: 32,
  color: '#5f6368',
});

export const CardContent =  styled('div')({
  flex: 1,
});

export const CardTitle = styled('h4')({
  fontSize: 18,
  marginBottom: 8,
});

export const CardSubtitle = styled('p')({
  fontSize: 14,
  color: '#777',
});

export const CardDetails =  styled('div')({
  fontSize: 14,
  color:' #555',
  marginTop: 8,
  'div': {
    marginbottom: 4,
  }
});
