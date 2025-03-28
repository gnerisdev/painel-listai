import styled from 'styled-components';

export const Sidebar = styled('aside')({
  width: "250px",
  padding: "20px",
  background: "#fff",
});

export const UserSection = styled('div')({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "20px",
});

export const Avatar = styled('div')({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "18px",
  marginBottom: "10px",
});

export const UserName = styled('div')({
  fontWeight: "bold",
  fontSize: "16px",
});

export const WelcomeText = styled('div')({
  fontSize: "12px",
  color: "#666",
});

export const MenuList = styled.ul({
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const MenuItem = styled.li({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  color: "#333",
  fontSize: "14px",
  transition: "background 0.3s",
  ":hover": {
    background: "#f5f5f5",
  },
  "& svg": {
    marginRight: "10px",
    fontSize: "18px",
  },
});