import styled from '@emotion/styled';
import Hamburger from 'hamburger-react';
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { HiSquares2X2 } from 'react-icons/hi2';
import { IoMdHome, IoMdSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdOutlineSportsSoccer, MdSecurity } from 'react-icons/md';
import { useLocation } from 'react-router-dom';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;

  background-color: #041643;
  color: #afafaf;

  font-family: Axiforma;
  line-height: 1.5;
  font-weight: 400;
`;
const SectionContainer = styled.div<{ isOpen: boolean }>`
  @media (max-width: 600px) {
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
  }
`;
const HamburgerContainer = styled.div`
  display: none;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 20px 10px 20px;
`;
const SectionTitle = styled.span`
  font-size: 12px;
  color: #afafaf;
`;
const SectionItem = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 15px 15px 10px;

  &:hover {
    border-radius: 10px;
    border-style: solid;
    border-width: 0px;
    background-color: #ffffff;
    color: #252424;
  }
  ${({ active }) =>
    active &&
    `
    border-radius: 10px;
    border-style: solid;
    border-width: 0px;
    background-color: #ffffff;
    color: #252424;
  `}
`;
const SectionItemText = styled.span`
  font-size: 14px;
`;
const LogoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;
const Logo = styled.span`
  font-family: 'Mr Dafoe', cursive;
  line-height: 1.5;
  font-weight: 400;
  font-style: normal;
  font-size: 1.5em;
  transform: rotate(-4deg);
  color: #ffffff;
`;
export function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('pocetna');
  const location = useLocation();
  const links = ['pocetna', 'user', 'project-associate', 'categor', 'school-year'];

  useEffect(() => {
    links.map((link) => {
      if (location.pathname.includes(link)) {
        setCurrentLink(link);
      }
    });
  }, [location]);

  return (
    <NavigationContainer>
      <LogoSection>
        <Logo>Activity Tracker</Logo>
        <HamburgerContainer>
          <Hamburger color="#ffffff" size={25} toggled={isOpen} toggle={setOpen} />
        </HamburgerContainer>
      </LogoSection>

      <SectionContainer isOpen={isOpen}>
        <Section>
          <SectionTitle>UPRAVLJANJE</SectionTitle>
          <SectionItem active={currentLink === 'pocetna'}>
            <IoMdHome />
            <SectionItemText> Pocetna</SectionItemText>
          </SectionItem>
          <SectionItem active={currentLink === 'user'}>
            <FaUsers />
            <SectionItemText> Korisnici</SectionItemText>
          </SectionItem>
          <SectionItem active={currentLink === 'project-associate'}>
            <MdOutlineSportsSoccer />
            <SectionItemText> Suradnici</SectionItemText>
          </SectionItem>
          <SectionItem active={currentLink === 'categor'}>
            <HiSquares2X2 />
            <SectionItemText> Kategorije</SectionItemText>
          </SectionItem>
          <SectionItem active={currentLink === 'school-year'}>
            <FaCalendarAlt />
            <SectionItemText> Skolske godine</SectionItemText>
          </SectionItem>
        </Section>

        <Section>
          <SectionTitle>POSTAVKE</SectionTitle>
          <SectionItem active={currentLink === 'settings'}>
            <IoMdSettings />
            <SectionItemText> Postavke</SectionItemText>
          </SectionItem>
          <SectionItem active={currentLink === 'security'}>
            <MdSecurity />
            <SectionItemText> Sigurnost</SectionItemText>
          </SectionItem>
        </Section>

        <Section>
          <SectionItem active={false}>
            <IoLogOut />
            <SectionItemText> Kraj rada</SectionItemText>
          </SectionItem>
        </Section>
      </SectionContainer>
    </NavigationContainer>
  );
}
