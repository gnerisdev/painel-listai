import styled from 'styled-components';

export const Main = styled('main')({
  margin: '56px auto'
});

export const WrapperButton = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  width: '100%',
  'button': {
    maxWidth: 250
  }
});

export const SectionHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '32px 0 16px',
  paddingBottom: '8px',
  borderBottom: '2px dashed #eee',
  '& h3': {
    fontSize: '1.2rem',
    color: '#333'
  }
});

export const Content = styled.div`
  margin-top: 2rem;
`;
export const WrapperFilter = styled.div`
  margin-bottom: 2rem;
`;

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%'
});

