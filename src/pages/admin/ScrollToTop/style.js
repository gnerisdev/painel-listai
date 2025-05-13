import styled from 'styled-components';

export const Content = styled('div')({
  margin: 'auto',
  padding: '32px 0'
});

export const Row = styled('div')({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
});

export const WrapperFloat = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: '4px 16px',
  'button': {
    maxWidth: 180
  },
});

