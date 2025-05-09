import styled from 'styled-components';

export const UploadImageWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column', 
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20px 0',
});

export const UploadImageContainer = styled('div')({
  position: 'relative',
  width: '200px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#888',
    backgroundColor: '#f9f9f9'
  }
});

export const WrapperPreview = styled('div')({
  display: 'grid',
  gridTemplateRows: '1fr 45px',
  height: '100%',
  gap: 8,
  button: {
    background: 'transparent',
    color: 'var(--secondary-color)',
    border: '2px solid var(--secondary-color)'
  }
});

export const ImagePreview = styled('img')({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  border: '2px dashed #ccc',
  borderRadius: '10px'
});

export const UploadImageLabel = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '100%',
  height: 200,
  border: '2px dashed #ccc',
  borderRadius: '10px',
});

export const UploadIcon = styled("span")({
  fontSize: 32,
  height: 32,
  width: 32,
  textAlign: "center",
  color: 'gray',

  '@media(min-width: 1024px)': {
    width: 40,
    height: 40,
    fontSize: 40,
  },
});

export const UploadImageText = styled('span')({
  color: '#666',
  fontSize: '14px'
});

export const UploadImageInput = styled('input')({
  display: 'none'
});

export const MessageError = styled('p')({
  color: '#fe6446',
  textAlign: 'left',
  fontSize: 12,
  margin: '4px 0'
});