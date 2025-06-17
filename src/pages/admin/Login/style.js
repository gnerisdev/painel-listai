import styled from 'styled-components';

export const Main = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100vh'
});

export const Content = styled('div')({
  margin: 'auto',
  width: '100%',
  maxWidth: 400,
  textAlign: 'center'
});

export const Logo = styled('img')({
  width: 180,
  margin: '0 auto'
});

export const Subtitle = styled('h2')({
  fontSize: '1.1rem'
});
