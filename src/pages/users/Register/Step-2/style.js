import styled from 'styled-components';

export const Subtitle = styled('h2')({
  fontSize: '1.4rem'
 });

export const Text = styled('p')({
  fontSize: '0.9rem',
  color: 'gray'
});

export const ListNumber = styled('div')({
  background: 'rgb(67, 32, 112)',
  fontSize: '1.4rem',
  color:  'var(--text-white)',
  display: 'inline',
  padding: '0 7px',
  borderRadius: 6,
  marginLeft: 6
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
  color: 'var(--text-color)', 
  marginBottom: 8, 
  display: 'flex', 
  alignItems: 'center',
  gap: 8
});

export const Suggestion = styled('ul')({
  margin:'0 0 24px',
  color: '#333',
  textTransform: 'capitalize',
  textAlign: 'start',
  li: {
    i: { marginLeft: 12, cursor: 'pointer', color: 'red' }
  }
});