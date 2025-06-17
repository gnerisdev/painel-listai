import styled from 'styled-components';

export const SectionMessage = styled('section')({
  padding: '40px 0',
  '& > div': {
    padding: 0
  },
  '.content': {
    color:  'var(--text-white)',
    textAlign: 'center',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 40,
    '.icon': {
      fontSize: 128
    },
    button: {
      maxWidth: 280
    }
  }
});

export const TitleSection = styled('h2')({
  marginBottom: 5,
  fontSize: 22,
  textAlign: 'center',
});

export const WrapperForm = styled('div')({
  display: 'grid',
  gap: 16
});