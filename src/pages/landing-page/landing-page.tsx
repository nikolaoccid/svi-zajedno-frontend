import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import hero from '/hero.jpeg';

import { useAuthenticatedUser } from '../../hooks/use-authenticated-user.ts';

const LandingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-position: 50% 50%;
  background-image: url(${hero});
  background-size: cover;
`;

const Heading = styled.h1`
  color: white;
  font-size: 2.5rem;
  text-align: center;
`;
const SubHeading = styled.h2`
  font-size: 2rem;
  color: white;
  text-align: center;
`;
const CTALink = styled(Link)`
  background-color: #2196f3;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 20px 35px;
  color: white;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background: rgba(0, 0, 0, 0.25);
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const CenterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
function LandingPage() {
  const { data: user } = useAuthenticatedUser();

  return (
    <LandingPageContainer>
      <Overlay>
        <Center>
          <Heading>Platforma Activity Tracker</Heading>
          <SubHeading>Učinkovito pratite i upravljajte aktivnostima svojih korisnika</SubHeading>
          <CenterContent>
            <CTALink to={user ? '/school-year' : '/login'}>{user ? 'Admin portal' : 'Login'}</CTALink>
          </CenterContent>
        </Center>
      </Overlay>
    </LandingPageContainer>
  );
}

export default LandingPage;
