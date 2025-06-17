import styled from 'styled-components';

export const SectionInfo = styled('section')({
  padding: '40px 0',
  '.content': {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 800,
    margin: 'auto',
    '.text-info': {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    },
    p: {
      color: 'var(--text-color)',
    },
    span: {
      fontSize: 40,
      textAlign: 'center',
      width: 40
    }
  }
});

export const TitleSection = styled('h2')({
  marginBottom: 5,
  fontSize: 22,
  textAlign: 'center',
});