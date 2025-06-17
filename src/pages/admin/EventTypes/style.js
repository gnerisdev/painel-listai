import styled from 'styled-components';

export const Content = styled('div')({
  margin: '0 0',
  padding: '32px 0'
});

export const WrapperButton = styled('div')({
  display: 'flex',
  justifyContent: 'end',
  marginTop: 24
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
  '.summary-edit': {
    fontSize: 14,
    display: 'flex',
    gap: 4,
    alignItems: 'center'
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
  '.type-disabled': {
    fontSize: 12,
    height: 16,
    color: 'var(--danger-color)',
    border: '1px solid var(--danger-color)',
    padding: 4,
    marginRight: 8
  }
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

export const ListItem = styled('li')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 15px',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff',
  '&:last-of-type': {
    borderBottom: 'none'
  },
  'button': {
    fontSize: 12,
    height: 32
  }
});

export const WrapperBadge = styled('div')({
  display: 'flex',
  gap: 4
});

export const Badge = styled('span')({
  backgroundColor: '#007bff',
  color: 'var( --text-white)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  width: 30,
  height: 30,
  fontSize: '1rem',
});

export const WrapperForm = styled('div')({
  width: '100%',
  maxWidth: 450,
});

export const ActionCategory = styled('div')({
  display: 'flex',
  fontSize: 14,
  button: {
    display: 'flex',
    color: '#0d6efd',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer'
  }
});
