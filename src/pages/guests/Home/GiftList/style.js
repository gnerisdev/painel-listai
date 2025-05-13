import styled from 'styled-components';

export const SectionGifts = styled('section')({
  padding: '40px 0',
  '.content': {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    maxWidth: 800,
    margin: 'auto'
  },
  '.gift': {
    width: 240,
    height: 280,
    padding: '24px',
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    margin: '15px auto 30px',
    boxShadow: '0 0 5px #9f9f9f',
    borderRadius: 8,
    textAlign: 'center',
    '.title': {
      margin: '20px 0 0',
      fontSize: 16,
      fontWeight: 500
    },
    '.price': {
      margin: '0',
      fontSize: 16,
      color: '#929292'
    },
    img: {
      height: 120,
      width: 'auto',
      objectFit: 'contain'
    },
    button: {
      position: 'absolute',
      bottom: -18,
      padding: '12px 20px',
      color:  'var(--text-white)',
      borderRadius: 5,
      fontSize: 12,
      fontWeight: 500,
      width: '90%',
      left: '50%',
      transform: 'translateX(-50%)',
      cursor: 'pointer'
    }
  }
});