import styled from '@emotion/styled';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { HiSquares2X2 } from 'react-icons/hi2';
import { IoMdHome, IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdOutlineSportsSoccer, MdSecurity } from 'react-icons/md';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  padding: 20px;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  background-color: #041643;
  color: #afafaf;

  font-family: 'Axiforma';
  line-height: 1.5;
  font-weight: 400;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 50px 20px 30px 20px;
`;
const SectionTitle = styled.span`
  font-size: 12px;
  color: #afafaf;
`;
const SectionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 15px 15px 10px;

  &:hover {
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    background-color: #ffffff;
    color: #252424;
  }
`;
const SectionItemText = styled.span`
  font-size: 14px;
`;
const LogoSection = styled.div`
  display: flex;
  justify-content: center;
`;
const Logo = styled.span`
  font-family: 'Mr Dafoe', cursive;
  line-height: 1.5;
  font-weight: 400;
  font-style: normal;
  font-size: 1.7em;
  transform: rotate(-4deg);
  color: #ffffff;
`;
export function Navigation() {
  return (
    <NavigationContainer>
      <LogoSection>
        <Logo>Activity Tracker</Logo>
      </LogoSection>

      <Section>
        <SectionTitle>UPRAVLJANJE</SectionTitle>
        <SectionItem>
          <IoMdHome />
          <SectionItemText> Pocetna</SectionItemText>
        </SectionItem>
        <SectionItem>
          <FaUsers />
          <SectionItemText> Korisnici</SectionItemText>
        </SectionItem>
        <SectionItem>
          <MdOutlineSportsSoccer />
          <SectionItemText> Suradnici</SectionItemText>
        </SectionItem>
        <SectionItem>
          <HiSquares2X2 />
          <SectionItemText> Kategorije</SectionItemText>
        </SectionItem>
        <SectionItem>
          <FaCalendarAlt />
          <SectionItemText> Skolske godine</SectionItemText>
        </SectionItem>
      </Section>

      <Section>
        <SectionTitle>POSTAVKE</SectionTitle>
        <SectionItem>
          <IoMdSettings />
          <SectionItemText> Postavke</SectionItemText>
        </SectionItem>
        <SectionItem>
          <MdSecurity />
          <SectionItemText> Sigurnost</SectionItemText>
        </SectionItem>
      </Section>

      <Section>
        <SectionItem>
          <IoLogOut />
          <SectionItemText> Kraj rada</SectionItemText>
        </SectionItem>
      </Section>
    </NavigationContainer>
  );
}
