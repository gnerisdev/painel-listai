import styled from "styled-components";

export const Container = styled('div')({
  margin: '24px 0'
});

export const MetricsContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
  marginBottom: '2rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr'
  }
});

export const MetricCard = styled('div')({
  backgroundColor: '#5D3891',
  color: 'white',
  borderRadius: '0.5rem',
  padding: '1rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
});

export const MetricTitle = styled('h3')({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '0.5rem'
});

export const MetricValue = styled('p')({
  fontSize: '1.5rem',
  fontWeight: '700'
});

export const ChartContainer = styled('div')({
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '1rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
});

export const ChartTitle = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: '500',
  marginBottom: '1rem',
  textAlign: 'center'
});