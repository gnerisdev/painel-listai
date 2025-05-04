import styled from 'styled-components';

export const Content = styled('div')({
  margin: 'auto',
  padding: '32px 0'
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

export const WrapperCep = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 56px',
  alignItems: 'end',
  'button': {
    height: 44,
    color:  'var(--text-white)',
    fontSize: 21,
    borderTopRightRadius: 5,
    borderEndEndRadius: 5,
    boxShadow: '1px 1px 10px #ccc5c5',
    cursor: 'pointer'
  },
});

export const WrapperFloat = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  'button': {
    maxWidth: 180
  },
});

