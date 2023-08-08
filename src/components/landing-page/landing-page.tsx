import styled from '@emotion/styled';

const LandingPageContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
`;

function LandingPage() {
  return (
    <LandingPageContainer>
      <Heading>Program Svi zajedno</Heading>
    </LandingPageContainer>
  );
}

export default LandingPage;
