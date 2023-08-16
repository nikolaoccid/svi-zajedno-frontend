import styled from '@emotion/styled';
import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';

import projectUserImage from '/project-users.png';

import { toastInfo } from '../../utils/toast.ts';
import { AlignRight, CenterContent, NavLink, PageContainer } from '../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from './hooks/use-fetch-school-year.ts';

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;
const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 33%;
  gap: 20px;
`;
const MenuContent = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
const MenuImage = styled.img`
  width: 120px;
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
            <NavLink to="/school-year">
              School year: {schoolYear[0].startYear}/{schoolYear[0].endYear}{' '}
            </NavLink>
          )}
        </AlignRight>
        <h1>Dashboard page</h1>
        <Menu>
          <MenuItem>
            <MenuImage src={projectUserImage} />
            <MenuContent>
              <NavLink to={`${schoolYear}/users`}>Svi korisnici</NavLink>
              <NavLink to={`${schoolYear}/user`}>Kreiraj novog korisnika</NavLink>
            </MenuContent>
          </MenuItem>
          <MenuItem>
            <MenuImage src={projectUserImage} />
            <MenuContent>
              <NavLink to={`${schoolYear}/users`}>Svi korisnici</NavLink>
              <NavLink to={`${schoolYear}/user`}>Kreiraj novog korisnika</NavLink>
            </MenuContent>
          </MenuItem>
        </Menu>
      </CenterContent>
    </PageContainer>
  );
}
