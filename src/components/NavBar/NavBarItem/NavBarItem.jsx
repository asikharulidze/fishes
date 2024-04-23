import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink = styled(RouterNavLink)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;

  &:hover {
    background-color: #111;
  }

  &.active {
    background-color: #22c55e;
  }
`;

const NavBarItem = ({ title, to }) => {
  return <NavLink to={to}>{title}</NavLink>;
};

export default NavBarItem;
