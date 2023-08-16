import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import projectAssociateImage from '/project-associate.png';
import projectUserImage from '/project-users.png';

import { toastInfo } from '../../utils/toast.ts';
import { AlignRight, CenterContent, NavLink, PageContainer } from '../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from './hooks/use-fetch-school-year.ts';

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
`;
const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  border-radius: 4px;
  border: 2px solid lightgray;
`;
const MenuContent = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
const MenuImage = styled.img`
  width: 144px;
`;
export const DashboardNavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export function DashboardPage() {
  const { data: schoolYear, isLoading: isLoadingSchoolYear, error } = useSelectedSchoolYear();

  useEffect(() => {
    if (error) {
      toastInfo('Could not fetch year');
    }
  }, [error]);

  if (isLoadingSchoolYear) {
    return (
      <PageContainer>
        <CenterContent>
          <BounceLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <AlignRight>
          {schoolYear && (
            <DashboardNavLink to="/school-year">
              School year: {schoolYear[0].startYear}/{schoolYear[0].endYear}{' '}
            </DashboardNavLink>
          )}
        </AlignRight>
        <h1>Dashboard page</h1>
        <Menu>
          <MenuItem>
            <MenuImage src={projectUserImage} />
            <MenuContent>
              <h2>KORISNICI</h2>
              <DashboardNavLink to={`${schoolYear}/users`}>Svi korisnici</DashboardNavLink>
              <DashboardNavLink to={`${schoolYear}/user`}>Kreiraj novog korisnika</DashboardNavLink>
            </MenuContent>
          </MenuItem>
          <MenuItem>
            <MenuImage src={projectAssociateImage} />
            <MenuContent>
              <h2>SURADNICI</h2>
              <NavLink to={`${schoolYear}/users`}>Svi suradnici</NavLink>
              <NavLink to={`${schoolYear}/user`}>Kreiraj novog suradnika</NavLink>
            </MenuContent>
          </MenuItem>
        </Menu>
      </CenterContent>
    </PageContainer>
  );
}
