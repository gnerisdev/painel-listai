import styled from 'styled-components';

export const Subtitle = styled('h2')({
});

export const Text = styled('p')({
  fontSize: '0.9rem',
  color: 'gray'
});

export const TextSmall = styled('p')({
  fontSize: '0.8rem',
  color: 'gray',
  margin: '16px 0 0'
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  margin: '1.6rem 0',
  padding: '0 6px'
});

export const Row = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  '> :nth-child(1)': {
    marginRight: 8,
  },
  '> :nth-child(2)': {
    marginLeft: 8,
  }
});