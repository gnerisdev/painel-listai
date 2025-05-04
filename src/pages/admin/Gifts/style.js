import styled from 'styled-components';

export const Content = styled('div')({
  margin: '0 0',
  padding: '32px 0'
});

export const WrapperSubHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '8px 32px'
});

export const Details = styled('details')({
  fontSize: '1rem',
  margin: '1rem 0',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.01), 0 5px 5px -5px rgba(0, 0, 0, 0.04)',
  borderRadius: '2px',
  borderLeft: '2px solid var(--primary-color) ',
  position: 'relative',
  padding: '8px',

  '.summary-title': {
    userSelect: 'none',
  },

  '&:hover': {
    cursor: 'pointer',
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
    padding: '16px',

    '&:focus': {
      outline: 'none',
    },

    '&:hover .summary-chevron-up svg': {
      opacity: 1,
    },
  },

  '.summary-chevron-up svg': {
    opacity: 0.5,
  },

  '.summary-chevron-up, .summary-chevron-down': {
    pointerEvents: 'none',
    position: 'absolute',
    top: '0.75em',
    right: '16px',
    background: '#ffffff',

    svg: {
      display: 'block',
    },
  },

  'summary::-webkit-details-marker': {
    display: 'none',
  },
});

export const WrapperTable = styled('div')({
  margin: '-24px 0 0',
  table: {
    minWidth: 600
  },
  'th, td': {
    textAlign: 'start',
    padding: '8px'
  },
});