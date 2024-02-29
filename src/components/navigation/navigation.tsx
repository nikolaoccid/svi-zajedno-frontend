import styled from '@emotion/styled';
import Hamburger from 'hamburger-react';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaExchangeAlt } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { HiSquares2X2 } from 'react-icons/hi2';
import { IoMdHome } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSchoolYear } from '../../pages/dashboard-page/hooks/use-fetch-school-year.ts';

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px;

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
    font-weight: 500;
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
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const [currentLink, setCurrentLink] = useState('pocetna');
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = {
    Other: [
      {
        name: 'Promijeni skolsku godinu',
        icon: FaExchangeAlt,
        innerName: 'changeSchoolYear',
        link: '/school-year',
      },
    ],
    [`${schoolYear?.startYear} / ${schoolYear?.endYear}`]: [
      { name: 'Kontrolna ploca', icon: IoMdHome, innerName: 'pocetna', link: `/${startYear}/dashboard` },
      { name: 'Korisnici', icon: FaUsers, innerName: 'user', link: `/${startYear}/users` },
    ],
    POSTAVKE: [
      { name: 'Suradnici', icon: MdOutlineSportsSoccer, innerName: 'project-associate' },
      { name: 'Kategorije', icon: HiSquares2X2, innerName: 'categor' },
      { name: 'Skolske godine', icon: FaCalendarAlt, innerName: 'school-year' },
      // { name: 'Postavke', icon: IoMdSettings, innerName: 'settings' },
      // { name: 'Sigurnost', icon: MdSecurity, innerName: 'security' },
    ],
    NoTitleSection: [{ name: 'Kraj rada', icon: IoLogOut, innerName: 'logout', link: '/logout' }],
  };

  useEffect(() => {
    Object.keys(menuItems).map((section) => {
      menuItems[section].map((item) => {
        if (location.pathname.includes(item.innerName)) {
          setCurrentLink(item.innerName);
        }
      });
    });
  }, [location, menuItems]);

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
            <SectionTitle>{section !== 'NoTitleSection' && section !== 'Other' ? section : ''}</SectionTitle>
            {menuItems[section].map((item) => (
              <SectionItem key={item.name} active={currentLink === item.innerName} onClick={() => navigate(item.link)}>
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
