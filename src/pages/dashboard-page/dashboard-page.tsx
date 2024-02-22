import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

import categoryImage from '/category.png';
import projectAssociateImage from '/project-associate.png';
import projectUserImage from '/project-users.png';
import schoolYearImage from '/school-year.png';
import statisticsImage from '/statistics.png';

import { Submenu } from '../../components/submenu/submenu.tsx';
import { toastInfo } from '../../utils/toast.ts';
import { CenterContent, NavLink, PageContainer } from '../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from './hooks/use-fetch-school-year.ts';

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const MenuRow = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 80px;
  flex-direction: row;
`;
const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 50%;
  padding: 20px;
  border-radius: 4px;
  border: 2px solid #4c4c4c;

  &:hover {
    box-shadow:
      rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
`;
const MenuContent = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;
const MenuImage = styled.img`
  height: 160px;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const DashboardNavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
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
        <Submenu />
        <h1>Nadzorna ploča</h1>
        <Menu>
          <MenuRow>
            <MenuItem>
              <ImageContainer>
                <MenuImage src={projectUserImage} />
              </ImageContainer>
              <MenuContent>
                <h2>KORISNICI</h2>
                <DashboardNavLink to={`/${schoolYear && schoolYear.startYear}/users`}>Svi korisnici</DashboardNavLink>
                <DashboardNavLink to={`/${schoolYear && schoolYear.startYear}/user/new`}>
                  Kreiraj novog korisnika
                </DashboardNavLink>
              </MenuContent>
            </MenuItem>
            <MenuItem>
              <ImageContainer>
                <MenuImage src={projectAssociateImage} />
              </ImageContainer>
              <MenuContent>
                <h2>SURADNICI</h2>
                <NavLink to={`/${schoolYear && schoolYear.startYear}/project-associates`}>Svi suradnici</NavLink>
                <NavLink to={`/${schoolYear && schoolYear.startYear}/project-associate/new`}>
                  Kreiraj novog suradnika
                </NavLink>
              </MenuContent>
            </MenuItem>
          </MenuRow>
          <MenuRow>
            <MenuItem>
              <ImageContainer>
                <MenuImage src={schoolYearImage} />
              </ImageContainer>
              <MenuContent>
                <h2>ŠKOLSKA GODINA</h2>
                <NavLink to={`/school-year`}>Sve školske godine</NavLink>
                <NavLink to={`/school-year/new`}>Kreiraj novu skolsku godinu</NavLink>
              </MenuContent>
            </MenuItem>
            <MenuItem>
              <ImageContainer>
                <MenuImage src={categoryImage} />
              </ImageContainer>
              <MenuContent>
                <h2>KATEGORIJE</h2>
                <NavLink to={`/${schoolYear && schoolYear.startYear}/categories`}>Sve kategorije</NavLink>
                <NavLink to={`/${schoolYear && schoolYear.startYear}/category/new`}>Kreiraj novu kategoriju</NavLink>
              </MenuContent>
            </MenuItem>
          </MenuRow>
          <MenuRow>
            <MenuItem>
              <ImageContainer>
                <MenuImage src={statisticsImage} />
              </ImageContainer>
              <MenuContent>
                <h2>STATISTIKA</h2>
                <NavLink to={`/${schoolYear && schoolYear.startYear}/statistics`}>Statistika</NavLink>
              </MenuContent>
            </MenuItem>
          </MenuRow>
        </Menu>
      </CenterContent>
    </PageContainer>
  );
}
