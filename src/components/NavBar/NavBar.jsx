import React from "react";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  display: flex;
  align-items: center;
  background-color: #333;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

function NavBar({ children }) {
  return <StyledNavBar>{children}</StyledNavBar>;
}

export default NavBar;
