import styled from '@emotion/styled';
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
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
const Container = styled.div<{ show: boolean }>`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  flex-direction: column;
  gap: 30px;
`;
export function Overview({ show }: { show: boolean }) {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatisticsAPI } = useAssociateStatistics(schoolYear ? schoolYear?.id : 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const associateStatistics = associateStatisticsAPI as any;
  const projectUserStatistics = projectUserStatisticsAPI as any;
  return (
    <Container show={show}>
      <Row>
        {projectUserStatistics && (
          <DashboardSingleWidget
            type={'Value'}
            title={'Procijenjena vrijednost projekta'}
            value={projectUserStatistics.totalProjectValue}
            euro={true}
          />
        )}
        {associateStatistics && (
          <DashboardSingleWidget
            type={'Associate'}
            title="Ukupno suradnika"
            value={associateStatistics[0]?.totalAssociates}
          />
        )}
        {projectUserStatistics && (
          <DashboardSingleWidget
            type={'Activity'}
            title={'Ukupno aktivnosti'}
            value={projectUserStatistics?.associatesTotalActivities}
          />
        )}
        {projectUserStatistics && (
          <>
            <DashboardSingleWidget type={'Users'} title={'Ukupno korisnika'} value={projectUserStatistics.totalUsers} />
          </>
        )}
      </Row>

      <Row>
        {projectUserStatistics && (
          <Column>
            <HeaderTitle>Izvorisni sustav korisnika</HeaderTitle>
            <PieChartComponent
              data={[
                { name: 'Izvorisni sustav CZSS', value: projectUserStatistics.sourceSystems.czss },
                {
                  name: 'Izvorisni sustav Obiteljski centar',
                  value: projectUserStatistics.sourceSystems.obiteljskicentar,
                },
              ]}
            />
          </Column>
        )}
        <Column>
          <HeaderTitle>Suradnici po kategorijama</HeaderTitle>
          {associateStatistics && <OverviewActivityTable data={associateStatistics} />}
        </Column>
      </Row>
    </Container>
  );
}
