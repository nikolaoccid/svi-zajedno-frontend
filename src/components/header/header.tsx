import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';
import { CenterContent, NavLink, PageContainer } from '../../pages/common-styles/common-styles.ts';

const HeaderContainer = styled.header`
  width: 100%;
  max-width: 100vw;
  background-color: #e8e8e8;
  color: black;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Nav = styled.nav``;

function Header() {
  const { data: user, isLoading: isLoadingUser } = useAuthenticatedUser();

  if (isLoadingUser) {
    return (
      <PageContainer>
        <CenterContent>
          <BounceLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
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
