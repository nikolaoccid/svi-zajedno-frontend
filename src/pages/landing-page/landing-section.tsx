import styled from '@emotion/styled';
import { MutableRefObject } from 'react';
import { GoDotFill } from 'react-icons/go';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1vw;
  border: 1px solid #e6e7ea;
  border-radius: 1vw;
  margin: 3vw;
  box-shadow: 0 4px 4px rgba(18, 22, 39, 0.02);
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5vw;
  width: 40%;
  gap: 1.85vw;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
const RightContent = styled.div`
  display: flex;
  width: 60%;
  padding: 0.75vw;
  @media (max-width: 900px) {
    width: 100%;
  }

  background:
    linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)),
    url('/landing-page/section-background.jpeg') no-repeat;

  background-size: cover;
  border-radius: 1vw;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1vw;
`;
const HeaderTitle = styled.p`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 2vw;
`;
const Subtext = styled.span`
  font-family: Axiforma;
  font-style: normal;
  font-size: 1.3vw;
  color: #606060;
`;
const SubtextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`;
interface LandingSectionProps {
  title: string;
  subtext: string[];
  picture: string;
  forwardRef?: MutableRefObject<HTMLDivElement | null>;
}
export function LandingSection({ title, subtext, picture, forwardRef }: LandingSectionProps) {
  return (
    <Container ref={forwardRef}>
      <LeftContent>
        <HeaderTitle>{title}</HeaderTitle>
        <SubtextContainer>
          {subtext.map((text) => (
            <Subtext key={text}>
              <GoDotFill size={15} color={'#051033'} /> {text}
            </Subtext>
          ))}
        </SubtextContainer>
      </LeftContent>
      <RightContent>
        <Image src={picture} alt={'image'} />
      </RightContent>
    </Container>
  );
}
