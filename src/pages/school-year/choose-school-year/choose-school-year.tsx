import { Navigate } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

import { HalfScreenHero } from '../../../components/half-screen-hero/half-screen-hero.tsx';
import { HeaderTextWithSubtext } from '../../../components/header-text-with-subtext/header-text-with-subtext.tsx';
import { Spinner } from '../../../components/spinner/spinner.tsx';
import { FlexRowContainer as PageContainer } from '../../common-styles/common-styles.ts';
import { ComponentContent } from './components/content/content.tsx';
import { useSchoolYears } from './hooks/use-fetch-school-years.ts';

export function ChooseSchoolYear() {
  const { data: schoolYears, isLoading } = useSchoolYears();

  if (isLoading) {
    return <Spinner SpinnerComponent={ClockLoader} color="#2196f3" />;
  }

  if (!schoolYears || (schoolYears as any)?.items.length === 0) {
    return <Navigate to="/school-year/new" />;
  }
  return (
    <PageContainer>
      <HalfScreenHero />

      <ComponentContent
        header={
          <HeaderTextWithSubtext
            title={'Choose the academic year'}
            subtext={'Select the academic year you wish to administer'}
          />
        }
        schoolYears={schoolYears}
      />
    </PageContainer>
  );
}
