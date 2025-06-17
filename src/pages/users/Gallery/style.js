import styled from 'styled-components';

export const Content = styled('div')({
  display: 'flex',
  gap: 20,
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: '2rem'
});

export const UploadLabel = styled('label')({
  cursor: 'pointer',
  display: 'inline-block',
  position: 'relative',
  width: '100%',
  maxWidth: 200,
  input: {
    opacity: 0,
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
});

export const Card = styled('div')({
  border: '1px solid #ddd',
  borderRadius: 8,
  padding: 20,
  textAlign: 'center',
  background: '#fff',
  transition: '0.2s',
  '&:hover': {
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
});

export const Icon = styled('i')({
  fontSize: 40,
  color: '#007bff',
  marginBottom: 10,
});

export const Title = styled('h3')({
  fontSize: 16,
  margin: '10px 0 5px',
  color: '#333',
  fontWeight: 'normal'
});

export const Subtitle = styled('p')({
  fontSize: 14,
  color: '#888',
});

export const PreviewArea = styled('div')({
  marginTop: 40,
  textAlign: 'center',
  img: {
    maxWidth: '100%',
    maxHeight: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  video: {
    maxWidth: '100%',
    maxHeight: 300,
    borderRadius: 8,
  },
});

export const Description = styled('p')({
  textAlign: 'center',
  fontStyle: 'italic',
  fontSize: '0.875rem',
  color: '#6b7280',
  marginBottom: '8px',
});

export const Container = styled('div')({
  width: '320px',
  height: '176px',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  margin: '0 auto',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
});

export const BlurredBackground = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(8px)',
  opacity: 0.4,
});

export const CenterContent = styled('div')({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: { },
});

export const Actions = styled('div')({
  position: 'absolute',
  top: 8,
  right: 8,
  display: 'flex',
  gap: '8px',
});

export const Button = styled('button')({
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#3b82f6',
  color:  'var(--text-white)',
  fontSize: '18px',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#2563eb',
  },
});

export const GalleryGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 320px))',
  gap: 16,
  marginTop: 16,
  justifyContent: 'center'
});

export const GalleryItem = styled('div')({
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  position: 'relative',

  img: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
  },

  video: {
    width: '100%',
    height: 140,
    objectFit: 'cover',
  },
});

export const GalleryTitle = styled('h3')({
  marginTop: 56,
  textAlign: 'center'
});

export const RemoveButton = styled('button')({
  position: 'absolute',
  top: 8,
  right: 8,
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: 'var(--primary-color)',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
  zIndex: 1,
});