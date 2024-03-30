import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderTitle } from '../project-user/user-list/user-list.tsx';
import { PieChartComponent } from '../statistics/components/pie-chart-component/pie-chart-component.tsx';
import { useAssociateStatistics } from '../statistics/hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from '../statistics/hooks/use-project-user-statistics.ts';
import { DashboardSingleWidget } from './dashboard-single-widget.tsx';
import { OverviewActivityTable } from './overview-activity-table.tsx';
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
const Column = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  width: 50%;
  // gap: ${(props) => props.gap ?? ''};
`;
const Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 30px;
`;
export function Overview({ show }: { show: boolean }) {
  const { t } = useTranslation();
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatistics } = useAssociateStatistics(schoolYear ? schoolYear?.id : 0);
  const { data: projectUserStatistics } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  return (
    <Container show={show}>
      <Row>
        {projectUserStatistics && (
          <DashboardSingleWidget
            type={'Value'}
            title={t('Estimated project value')}
            value={projectUserStatistics?.totalProjectValue}
            euro={true}
          />
        )}
        {associateStatistics && (
          <DashboardSingleWidget
            type={'Associate'}
            title={t('Total project associates')}
            value={associateStatistics[0]?.totalAssociates}
          />
        )}
        {projectUserStatistics && (
          <DashboardSingleWidget
            type={'Activity'}
            title={t('Total activities')}
            value={projectUserStatistics?.associatesTotalActivities}
          />
        )}
        {projectUserStatistics && (
          <>
            <DashboardSingleWidget type={'Users'} title={t('Total users')} value={projectUserStatistics.totalUsers} />
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
        <Column gap="1vw">
          <HeaderTitle>{t('Associates and users by categories')}</HeaderTitle>
          {associateStatistics && <OverviewActivityTable data={associateStatistics} />}
        </Column>
      </Row>
    </Container>
  );
}
