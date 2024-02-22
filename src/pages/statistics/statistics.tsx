import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { Submenu } from '../../components/submenu/submenu.tsx';
import { CenterContent, PageContainer } from '../common-styles/common-styles.ts';
import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { Row } from '../project-associate/project-associate-view/project-associate-view.tsx';
import { BarChartComponent } from './components/bar-chart-component/bar-chart-component.tsx';
import { BigBanner } from './components/big-banner/big-banner.tsx';
import { PieChartComponent } from './components/pie-chart-component/pie-chart-component.tsx';
import ResponsiveTableComponent from './components/responsive-table-component/responsive-table-component.tsx';
import { SmallBanner } from './components/small-banner/small-banner.tsx';
import { TinyBarChartsComponent } from './components/tiny-bar-chart-component/tiny-bar-charts.tsx';
import { useAssociateStatistics } from './hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from './hooks/use-project-user-statistics.ts';

const RowCenteredWithGap = styled(Row)`
  justify-content: center;
  gap: 10px;
`;
export const Statistics = () => {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatisticsAPI } = useAssociateStatistics(schoolYear ? schoolYear?.id : 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const associateStatistics = associateStatisticsAPI as any;
  const projectUserStatistics = projectUserStatisticsAPI as any;
  console.log('associateStatistics', associateStatistics);
  console.log('projectUserStatistics', projectUserStatistics);

  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>
          Statistika korisnika {schoolYear ? schoolYear?.startYear : ''} / {schoolYear ? schoolYear?.endYear : ''}
        </h1>
        {projectUserStatistics && (
          <BigBanner
            text="Procijenjena vrijednost projekta"
            count={projectUserStatistics?.totalProjectValue}
            euro={true}
          />
        )}

        <RowCenteredWithGap>
          {projectUserStatistics && <SmallBanner text="Ukupno korisnika" count={projectUserStatistics?.totalUsers} />}
          {projectUserStatistics && (
            <SmallBanner text="Ukupno aktivnosti" count={projectUserStatistics?.totalActivities} />
          )}
        </RowCenteredWithGap>
        <h2>Statistika korisnika po spolu i godinama</h2>
        <RowCenteredWithGap>
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
            <PieChartComponent
              data={[
                { name: '<6', value: projectUserStatistics.ageGroups.under6 },
                { name: '7 - 12', value: projectUserStatistics.ageGroups.age7to12 },
                { name: '13 - 18', value: projectUserStatistics.ageGroups.age13to18 },
                { name: '19 - 24', value: projectUserStatistics.ageGroups.under6 },
              ]}
              color="#004279"
            />
          )}
        </RowCenteredWithGap>
        <h2>Izvorisni sustav korisnika</h2>
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

        <h2>Statistika korisnika po aktivnostima</h2>
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

        <h2>Statistika korisnika po pravu upisa</h2>
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
        <h1>
          Statistika suradnika {schoolYear ? schoolYear?.startYear : ''} / {schoolYear ? schoolYear?.endYear : ''}
        </h1>
        <RowCenteredWithGap>
          {associateStatistics && (
            <SmallBanner text="Ukupno suradnika" count={associateStatistics[0]?.totalAssociates} />
          )}
          {projectUserStatistics && (
            <SmallBanner text="Ukupno aktivnosti" count={projectUserStatistics?.totalActivities} />
          )}
        </RowCenteredWithGap>
        <h2>Statistika suradnika po kategorijama</h2>
        {associateStatistics && <ResponsiveTableComponent data={associateStatistics} />}
      </CenterContent>
    </PageContainer>
  );
};
