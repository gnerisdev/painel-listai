import styled from 'styled-components';

export const BoxNumber = styled('div')({
  padding: '16px',
  borderRadius: '5px',
  background: '#fff',
  position: 'relative',
  flexGrow: 1,
  boxShadow: '1px 1px 10px #ccc5c5',
  '.number': {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: 'var(--primary-color) '
  },
  '.text': {
    fontSize: '0.8rem',
    color: '#696969'
  }
});