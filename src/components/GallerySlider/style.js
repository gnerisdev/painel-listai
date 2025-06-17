import styled from 'styled-components';

export const Embla = styled.div({
  position: 'relative',
  overflow: 'hidden',
});

export const EmblaViewport = styled.div({
  overflow: 'hidden',
  width: '100%',
});

export const EmblaContainer = styled.div({
  display: 'flex',
});

export const EmblaSlide = styled.div({
  flex: '0 0 100%',
});

export const SlideImage = styled.img({
  width: '100%',
  borderRadius: '8px',
  display: 'block',
  objectFit: 'cover',
  height: 280
});

export const EmblaButton = styled.button({
  background: '#FFFFFF',
  borderRadius: '50%',
  height: 40,
  width: 40,
  cursor: 'pointer',
  boxShadow: '0 0 5px rgba(0, 0, 0, .15)',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  left: 0,
  opacity: 0.9,
  '&.fa-angle-right': {
    left: 'auto',
    right: 0
  }
});
