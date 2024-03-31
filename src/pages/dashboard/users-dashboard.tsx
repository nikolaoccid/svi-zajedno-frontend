import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderTitle } from '../project-user/user-list/user-list.tsx';
import { PieChartComponent } from '../statistics/components/pie-chart-component/pie-chart-component.tsx';
import { useProjectUserStatistics } from '../statistics/hooks/use-project-user-statistics.ts';
import { DashboardSingleWidget } from './dashboard-single-widget.tsx';

const Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 30px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
export function UsersDashboard({ show }: { show: boolean }) {
  const { t } = useTranslation();
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const projectUserStatistics = projectUserStatisticsAPI as any;
  return (
    <Container show={show}>
      <Row>
        {projectUserStatistics && (
          <>
            <DashboardSingleWidget type={'Users'} title={t('Total users')} value={projectUserStatistics.totalUsers} />
            <DashboardSingleWidget
              type={'Activity'}
              title={t('Active users')}
              value={projectUserStatistics.activeUsers}
            />
            <DashboardSingleWidget
              type={'Value'}
              title={t('User activites total')}
              value={projectUserStatistics.totalActivities}
            />
            <DashboardSingleWidget
              type={'Associate'}
              title={t('Enrolled activities')}
              value={projectUserStatistics.activeActivities}
            />
          </>
        )}
      </Row>
      <Row>
        {projectUserStatistics && (
          <Column>
            <HeaderTitle>{t('User source system')}</HeaderTitle>
            <PieChartComponent
              data={[
                { name: t('Social welfare'), value: projectUserStatistics.sourceSystems.czss },
                {
                  name: t('Family center'),
                  value: projectUserStatistics.sourceSystems.obiteljskicentar,
                },
              ]}
            />
          </Column>
        )}
        <Column>
          <HeaderTitle>Korisnici po pravu upisa</HeaderTitle>
          {projectUserStatistics && (
            <PieChartComponent
              data={[
                { name: t('Direct enrollment'), value: projectUserStatistics.protectionTypes.zmn },
                { name: t('Recommendation'), value: projectUserStatistics.protectionTypes.preporuka },
                { name: t('Foster parents'), value: projectUserStatistics.protectionTypes.udomiteljstvo },
              ]}
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>
          <HeaderTitle>{t('Users by gender')}</HeaderTitle>
          {projectUserStatistics && (
            <PieChartComponent
              data={[
                { name: t('Female'), value: projectUserStatistics.femaleUsers },
                { name: t('Male'), value: projectUserStatistics.maleUsers },
              ]}
            />
          )}
        </Column>
        <Column>
          <HeaderTitle>{t('Users by age group')}</HeaderTitle>
          {projectUserStatistics && projectUserStatistics.ageGroups && (
            <PieChartComponent
              data={[
                { name: '<6', value: projectUserStatistics.ageGroups.under6 },
                { name: '7 - 12', value: projectUserStatistics.ageGroups.age7to12 },
                { name: '13 - 18', value: projectUserStatistics.ageGroups.age13to18 },
                { name: '19 - 24', value: projectUserStatistics.ageGroups.under6 },
              ]}
            />
          )}
        </Column>
      </Row>
    </Container>
  );
}
