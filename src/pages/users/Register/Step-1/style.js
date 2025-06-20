import styled from 'styled-components';

export const Subtitle = styled('h2')({ });

export const Text = styled('p')({
  fontSize: '0.9rem',
  color: 'gray'
});

export const WrapperForm = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  margin: '1.6rem 0',
  padding: '0 6px'
});

export const Label = styled('label')({
  color:  'var(--text-color)',
  width: '100%', 
  fontWeight: 'bolder',
  margin: '0 0 5px',
  display: 'block',
  fontSize: '0.9rem',
  textAlign: 'left'
});

export const LabelOption = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontSize: '0.9rem',
  color: 'var(--text-color)',
  cursor: 'pointer'
});

export const Checkbox = styled('input')({
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  border: '1px solid var(--primary-color)',
  appearance: 'none',
  outline: 'none',
  borderRadius: '4px',
  position: 'relative',

  '&:checked': {
    backgroundColor: 'var(--primary-color)',
    borderColor: 'var(--primary-color)',
  },

  '&:checked::after': {
    content: '""',
    position: 'absolute',
    top: '2px',
    left: '5px',
    width: '4px',
    height: '8px',
    border: 'solid white',
    borderWidth: '0 2px 2px 0',
    transform: 'rotate(45deg)',
  },
});

export const MessageError = styled('p')({
  color: '#fe6446',
  textAlign: 'left',
  fontSize: 12,
  margin: '4px 0'
});