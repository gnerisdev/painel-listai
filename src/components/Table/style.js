import styled from 'styled-components';


export const Wrapper = styled('section')({
  width: '100%',
  overflow: 'auto'
});

export const Table = styled('table')({
  width: '100%',
  minWidth: 900,
  borderCollapse: 'collapse',
  margin: '20px 0',
  border: '1px solid #ddd',
});

export const TableHeader = styled('thead')({
  backgroundColor: 'var(--primary-color) ',
  color: 'var(--text-white)',
  fontWeight: 'bold',
  'th': {
    padding: 8,
    textAlign: 'center'
  }
});

export const TableBody = styled('tbody')({
  'tr:nth-child(even)': {
    backgroundColor: '#f9f9f9',
  },
  'td': {
    padding: 8,
    textAlign: 'center',
    minWidth: 40
  }
});

export const Button = styled('button')({
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '14px',
  cursor: 'pointer',
  borderRadius: '4px',

  '&:hover': {
    backgroundColor: '#45a049',
  },
});

export const DotsButton = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: 18,
});

export const Dropdown = styled('div')({
  position: 'absolute',
  right: 0,
  background: 'white',
  border: '1px solid #ccc',
  boxShadow: ' 0px 4px 6px rgba(0, 0, 0, 0.1)',
  zIndex: 9,
  minWidth: 120
});

export const DropdownItem = styled('div')({
  padding: ' 8px 16px',
  cursor: 'pointer',
  textAlign: 'start',
  '&:hover': {
    background: '#f0f0f0'
  }
});

export const NotFoundData = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: 8,
  color: '#666',
  fontSize: '1rem',
  '.icon': {
    fontSize: '2rem', 
    marginBottom: '0.5rem', 
    color: '#999' 
  }
});