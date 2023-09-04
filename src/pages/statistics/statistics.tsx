import { useParams } from 'react-router-dom';

import { CenterContent, PageContainer } from '../common-styles/common-styles.ts';
import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { useAssociateStatistics } from './hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from './hooks/use-project-user-statistics.ts';

export const Statistics = () => {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatistics } = useAssociateStatistics(schoolYear ? schoolYear[0]?.id : 0);
  const { data: projectUserStatistics } = useProjectUserStatistics(schoolYear ? schoolYear[0]?.id : 0);

  console.log('associateStatistics', associateStatistics);
  console.log('projectUserStatistics', projectUserStatistics);
  return (
    <PageContainer>
      <CenterContent>
        <h1>Statistics</h1>
      </CenterContent>
    </PageContainer>
  );
};
