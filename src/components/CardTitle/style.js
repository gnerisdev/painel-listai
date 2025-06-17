import styled from "styled-components";

export const CardTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  boxShadow: "1px 1px 10px #ccc5c5",
  borderRadius: 5,
  width: '100%',
  flexBasis: '100%',
  "&:hover": {
    boxShadow: "0 0 8px var(--hover-color, #f29157)",
  },
  '@media(min-width: 1024px)': { 
    width: 180, 
    height: 180,
    boxShadow: "1px 1px 10px rgba(204, 197, 197, 0.5)",  
  },
});

export const Content = styled("div")({
  display: 'flex',
  padding: "24px",
  transition: "box-shadow 0.3s ease",
  cursor: 'pointer',
  gap: 16,

  '@media(min-width: 1024px)': {
    flexDirection: 'column', 
    textAlign: 'center', 
    alignItems: 'center'
  },

  ".wrapper-text": {
    display: "flex",
    flexDirection: "column",
  },

  ".title": {
    fontSize: "0.9rem",
    lineHeight: "20px",
    fontWeight: 700,
    color: "var(--text-color) ",
  },

  ".text": {
    fontSize: "0.7rem",
    lineHeight: "12px",
    color: "#696969",
  },
});


export const Icon = styled("span")({
  fontSize: 32,
  height: 32,
  width: 32,
  textAlign: "center",
  color: 'var(--hover-color)',

  '@media(min-width: 1024px)': {
    width: 40, 
    height: 40, 
    fontSize: 40, 
  },
});