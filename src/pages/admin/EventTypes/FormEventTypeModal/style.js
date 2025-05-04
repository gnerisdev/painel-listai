import styled from 'styled-components';

export const AreaUploadImage = styled('div')({
  margin: 'auto',
  color: 'var(--text-color)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  placeItems: 'center',
  '.content': {
    width: 120,
    height: 120,
    border: '1px solid #c6c6c6',
    borderRadius: 10,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 10,
    },
  },
  '.wrapper-input': {
    position: 'relative',
    button: {
      height: 32,
      padding: '0 12px',
    },
    input: {
      position: 'absolute',
      width: '100%',
      inset: 0,
      opacity: 0,
      cursor: 'pointer !important',
    },
    '.text-error': {
      color: '#fe6446',
      fontSize: 12,
      textAlign: 'center'
    }
  }
});

export const ButtonLink = styled('button')({
  background: 'none',
  border: 'none',
  color: 'var(--danger-color)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  margin: '4px auto 0',
});