import styled from 'styled-components';


export const UploadImageWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  margin: '20px 0',
});
export const UploadImageContainer = styled('div')({
  position: 'relative',
  width: '200px',
  height: '200px',
  border: '2px dashed #ccc',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',

  '&:hover': {
    borderColor: '#888',
    backgroundColor: '#f9f9f9'
  }
});
export const ImagePreview = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  cursor: 'pointer'
});

export const UploadImageLabel = styled('label')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: '100%',
  height: '100%'
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
