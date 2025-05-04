import styled from 'styled-components';

export const Button = styled('button')({
  width: '100%',
  height: 45,
  alignItems: 'center',
  background: 'var(--secondary-color) ',
  borderRadius: 5,
  outline: 'none',
  color:  'var(--text-white)',
  fontSize: '0.94rem',
  textTransform: 'uppercase',
  border: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(.96)'
  }
});

const spin = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Spinner = styled('div')({
  width: 28,
  height: 28,
  border: '3px solid rgba(255, 255, 255, 0.3)',
  borderTop: '3px solid white',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: 'auto'
}, spin);