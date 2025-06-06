import styled from 'styled-components';

export const BoxNumber = styled('div')({
  padding: '16px',
  borderRadius: '5px',
  background: '#fff',
  position: 'relative',
  flexGrow: 1,
  boxShadow: '1px 1px 10px #ccc5c5',
  '.number': {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1e242d'
  },
  '.text': {
    fontSize: '0.9rem',
    color: '#696969'
  }
});