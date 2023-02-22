import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { selectIsLoggedIn } from 'redux/auth/authSelectors';
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

export const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav>
            <StyledNavLink to="/">
                Home
            </StyledNavLink>
            {isLoggedIn && 
                <StyledNavLink to="/contacts">
                    Contacts
                </StyledNavLink>
            }
        </nav>
    );
};