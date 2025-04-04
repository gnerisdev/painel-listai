import styled from "styled-components";

export const Container = styled("div")({
  margin: "24px 0"
});

export const ButtonGroup = styled("div")({
  display: "flex",
  justifyContent: "center",
  margin: "24px 0"
});

export const SectionHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "32px 0 16px",
  paddingBottom: "8px",
  borderBottom: "2px dashed #eee",
  "& h3": {
    fontSize: "1.2rem",
    color: "#333"
  }
});

export const SortContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#666"
});

export const SortSelect = styled("select")({
  padding: "6px 12px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  background: "white"
});

export const GiftsList = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "16px",
  marginTop: "24px",
  
});

// Estilos adicionais para componentes específicos
export const GiftCard = styled("div")({
  backgroundColor: "white",
  borderRadius: "8px",
  padding: "1rem",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)"
  }
});

export const CardContent = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "1rem"
});

export const CardIcon = styled("div")({
  fontSize: "1.5rem",
  color: "#ff6b6b"
});

export const CardText = styled("div")({
  "& h4": {
    fontSize: "1rem",
    margin: "0 0 4px 0",
    color: "#333"
  },
  "& p": {
    fontSize: "0.9rem",
    margin: "0",
    color: "#666"
  }
});