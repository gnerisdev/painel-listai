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

export const Content = styled.div`
  margin-top: 2rem;
`;
export const WrapperFilter = styled.div`
  margin-bottom: 2rem;
`;

export const WrapperForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
