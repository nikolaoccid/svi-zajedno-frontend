import { useParams } from 'react-router-dom';

import { Submenu } from '../../components/submenu/submenu.tsx';
import { CenterContent, PageContainer } from '../common-styles/common-styles.ts';
import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import ResponsiveTableComponent from './components/responsive-table-component/responsive-table-component.tsx';
import { SmallBanner } from './components/small-banner/small-banner.tsx';
import { useAssociateStatistics } from './hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from './hooks/use-project-user-statistics.ts';

export const Statistics = () => {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatistics } = useAssociateStatistics(schoolYear ? schoolYear[0]?.id : 0);
  const { data: projectUserStatistics } = useProjectUserStatistics(schoolYear ? schoolYear[0]?.id : 0);

  const associateStatisticsTyped = associateStatistics as ProjectAssociatesStatistics[];
  const projectUserStatisticsTyped = projectUserStatistics as ProjectUserStatistics;
  console.log('associateStatistics', associateStatisticsTyped);
  console.log('projectUserStatistics', projectUserStatisticsTyped);

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>
          Statistika {schoolYear ? schoolYear[0]?.startYear : ''} / {schoolYear ? schoolYear[0]?.endYear : ''}
        </h1>
        {associateStatistics && (
          <SmallBanner text="Ukupno suradnika" count={associateStatisticsTyped[0]?.totalAssociates} />
        )}
        {projectUserStatistics && (
          <SmallBanner text="Ukupno korisnika" count={projectUserStatisticsTyped?.totalUsers} />
        )}
        <ResponsiveTableComponent data={associateStatisticsTyped} />
      </CenterContent>
    </PageContainer>
  );
};
