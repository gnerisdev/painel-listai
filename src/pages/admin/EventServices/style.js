import styled from 'styled-components';

export const Main = styled('main')({
  margin: '56px auto',
  table: {
    margin: '8px 0'
  },
});

export const Details = styled('details')({
  fontSize: '1rem',
  margin: '0 0 1.6rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.01), 0 5px 5px -5px rgba(0, 0, 0, 0.04)',
  borderRadius: '2px',
  borderLeft: '2px solid var(--primary-color) ',
  position: 'relative',
  padding: '6px',
  '&:hover': {
    cursor: 'pointer',
  },
  '.summary-left': {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    img: {
      width: 44,
      borderRadius: 5
    }
  },
  '.summary-content': {
    borderTop: '1px solid #e2e8f0',
    cursor: 'default',
    padding: '16px',
    fontWeight: 300,
    lineHeight: 1.5,
  },
  'summary': {
    listStyle: 'none',
    padding: '0 16px',
    '&:focus': {
      outline: 'none',
    },
  },
  '.summary-chevron-up, .summary-chevron-down': {
    pointerEvents: 'none',
    position: 'absolute',
    top: '0.75em',
    right: '16px',
    background: '#ffffff',
  },
});
