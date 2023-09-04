import { useParams } from 'react-router-dom';

import { Submenu } from '../../components/submenu/submenu.tsx';
import { CenterContent, PageContainer } from '../common-styles/common-styles.ts';
import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { BarChartComponent } from './components/bar-chart-component/bar-chart-component.tsx';
import { PieChartComponent } from './components/pie-chart-component/pie-chart-component.tsx';
import ResponsiveTableComponent from './components/responsive-table-component/responsive-table-component.tsx';
import { SmallBanner } from './components/small-banner/small-banner.tsx';
import { TinyBarChartsComponent } from './components/tiny-bar-chart-component/tiny-bar-charts.tsx';
import { useAssociateStatistics } from './hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from './hooks/use-project-user-statistics.ts';

export const Statistics = () => {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatisticsAPI } = useAssociateStatistics(schoolYear ? schoolYear[0]?.id : 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear[0]?.id : 0);

  const associateStatistics = associateStatisticsAPI as any;
  const projectUserStatistics = projectUserStatisticsAPI as any;
  console.log('associateStatistics', associateStatistics);
  console.log('projectUserStatistics', projectUserStatistics);

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>
          Statistika {schoolYear ? schoolYear[0]?.startYear : ''} / {schoolYear ? schoolYear[0]?.endYear : ''}
        </h1>
        {associateStatistics && <SmallBanner text="Ukupno suradnika" count={associateStatistics[0]?.totalAssociates} />}
        {projectUserStatistics && <SmallBanner text="Ukupno korisnika" count={projectUserStatistics?.totalUsers} />}
        {projectUserStatistics && (
          <PieChartComponent
            data={[
              { name: 'zensko', value: projectUserStatistics.femaleUsers },
              { name: 'musko', value: projectUserStatistics.maleUsers },
            ]}
            color="#8884d8"
          />
        )}

        {projectUserStatistics && projectUserStatistics.ageGroups && (
          <PieChartComponent data={projectUserStatistics.ageGroups} color="#004279" />
        )}
        {projectUserStatistics && (
          <TinyBarChartsComponent
            data={[
              {
                name: `Korisnik sustava CZSS`,
                sustav: projectUserStatistics.sourceSystems.czss,
              },
              {
                name: `Korisnik sustava Obiteljski centar`,
                sustav: projectUserStatistics.sourceSystems.obiteljskicentar,
              },
            ]}
            color="#82ca9d"
          />
        )}

        {projectUserStatistics && (
          <TinyBarChartsComponent
            data={[
              {
                name: `Direktni upis`,
                sustav: projectUserStatistics.protectionTypes.zmn,
              },
              {
                name: `Preporuka`,
                sustav: projectUserStatistics.protectionTypes.preporuka,
              },
              {
                name: `Udomitelji`,
                sustav: projectUserStatistics.protectionTypes.udomiteljstvo,
              },
            ]}
            color="#004279"
          />
        )}
        {associateStatistics && <ResponsiveTableComponent data={associateStatistics} />}

        {projectUserStatistics && (
          <BarChartComponent
            data={[
              {
                name: 'Aktivnosti koje se izvrsavaju',
                'Ukupno aktivnosti': projectUserStatistics.totalActivities,
                Aktivnost: projectUserStatistics.activeActivities,
              },
              {
                name: 'Aktivnosti na cekanju',
                'Ukupno aktivnosti': projectUserStatistics.totalActivities,
                Aktivnost: projectUserStatistics.pendingActivities,
              },
              {
                name: 'Aktivnosti koje su se prestale izvrsavati',
                'Ukupno aktivnosti': projectUserStatistics.totalActivities,
                Aktivnost: projectUserStatistics.inactiveActivities,
              },
            ]}
          />
        )}
      </CenterContent>
    </PageContainer>
  );
};
