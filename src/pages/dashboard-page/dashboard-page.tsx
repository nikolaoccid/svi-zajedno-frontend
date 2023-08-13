import { useEffect } from 'react';
import { BounceLoader } from 'react-spinners';

import { toastInfo } from '../../utils/toast.ts';
import { AlignRight, CenterContent, NavLink, PageContainer } from '../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from './hooks/use-fetch-school-year.ts';

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
      </CenterContent>
    </PageContainer>
  );
}
