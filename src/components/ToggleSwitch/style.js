import styled from "styled-components";

export const SwitchContainer = styled('label')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '12px 0',
});

export const Label = styled('span')({
  color: '#000',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left'
});

export const Switch = styled('label')({
  position: 'relative',
  display: 'inline-block',
  width: 42,
  height: 24,
});

export const Checkbox = styled('input')({
  opacity: 0,
  width: 0,
  height: 0,

  '&:checked + span': {
    backgroundColor: '#4b2671',
  },

  '&:checked + span:before': {
    transform: 'translateX(18px)',
  },
});

export const Slider = styled('span')({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: '#ccc',
  transition: '0.4s',
  borderRadius: 34,

  '&:before': {
    position: 'absolute',
    content: '""',
    height: 18,
    width: 18,
    left: 3,
    bottom: 3,
    background: 'white',
    transition: '0.4s',
    borderRadius: '50%',
  },
});
