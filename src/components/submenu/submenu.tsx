import { BounceLoader } from 'react-spinners';

import { CenterContent, PageContainer, ProfileSubmenu } from '../../pages/common-styles/common-styles.ts';
import { Column, DashboardNavLink } from '../../pages/dashboard-page/dashboard-page.tsx';
import { useSelectedSchoolYear } from '../../pages/dashboard-page/hooks/use-fetch-school-year.ts';
import { BackButton } from '../back-button/back-button.tsx';

export function Submenu() {
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSelectedSchoolYear();
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
    <ProfileSubmenu>
      <BackButton />

      {schoolYear && (
        <Column>
          <DashboardNavLink to={`/${schoolYear.startYear}`}>
            Skolska godina: {schoolYear.startYear}/{schoolYear.endYear}
          </DashboardNavLink>

          <DashboardNavLink to="/school-year">PROMIJENI SKOLSKU GODINU</DashboardNavLink>
        </Column>
      )}
    </ProfileSubmenu>
  );
}
