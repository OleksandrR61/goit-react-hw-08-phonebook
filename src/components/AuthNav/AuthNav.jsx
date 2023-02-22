import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
    display: inline-block;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    padding: 8px;
    color: #005500;
    
    &:hover,
    &:focus {
        color: tomato;
    }

    &.active {
        color: red;
        text-decoration: underline;
    }
`;

export const AuthNav = () => {
  return (
    <div>
      <StyledNavLink to="/register">
        Register
      </StyledNavLink>
      <StyledNavLink to="/login">
        Log In
      </StyledNavLink>
    </div>
  );
};