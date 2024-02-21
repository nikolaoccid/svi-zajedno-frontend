import styled from '@emotion/styled';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react';
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
  padding: 20px 20px 5px 20px;
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
const menuItems = {
  Manage: [
    { name: 'Pocetna', icon: IoMdHome, link: 'pocetna' },
    { name: 'Korisnici', icon: FaUsers, link: 'user' },
    { name: 'Suradnici', icon: MdOutlineSportsSoccer, link: 'project-associate' },
    { name: 'Kategorije', icon: HiSquares2X2, link: 'categor' },
    { name: 'Skolske godine', icon: FaCalendarAlt, link: 'school-year' },
  ],
  Settings: [
    { name: 'Postavke', icon: IoMdSettings, link: 'settings' },
    { name: 'Sigurnost', icon: MdSecurity, link: 'security' },
  ],
  '': [{ name: 'Kraj rada', icon: IoLogOut, link: 'logout' }],
};
export function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState('pocetna');
  const location = useLocation();

  useEffect(() => {
    Object.keys(menuItems).map((section) => {
      menuItems[section].map((item) => {
        if (location.pathname.includes(item.link)) {
          setCurrentLink(item.link);
        }
      });
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
        {Object.keys(menuItems).map((section) => (
          <Section key={section}>
            <SectionTitle>{section}</SectionTitle>
            {menuItems[section].map((item) => (
              <SectionItem key={item.name} active={currentLink === item.link}>
                {React.createElement(item.icon)}
                <SectionItemText> {item.name}</SectionItemText>
              </SectionItem>
            ))}
          </Section>
        ))}
      </SectionContainer>
    </NavigationContainer>
  );
}
