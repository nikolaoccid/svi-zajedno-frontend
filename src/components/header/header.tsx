import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100vw; /* Limit the width to the viewport width */
  background-color: #e8e8e8;
  color: black;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000; /* Ensure header is on top of content */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Nav = styled.nav``;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin-left: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

function Header() {
  const { data: user } = useAuthenticatedUser();
  return (
    <HeaderContainer>
      <Logo>Svi zajedno</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        {user ? <NavLink to="/logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
