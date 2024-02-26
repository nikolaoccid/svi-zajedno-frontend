import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { useAssociateStatistics } from '../statistics/hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from '../statistics/hooks/use-project-user-statistics.ts';
import { AssociatesDashboardTable } from './associates-dashboard-table.tsx';
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
export function AssociatesDashboard({ show }: { show: boolean }) {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatisticsAPI } = useAssociateStatistics(schoolYear ? schoolYear?.id : 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const associateStatistics = associateStatisticsAPI as any;
  const projectUserStatistics = projectUserStatisticsAPI as any;
  return (
    <Container show={show}>
      <Row>
        {associateStatistics && (
          <DashboardSingleWidget
            type={'Value'}
            title={'Ukupno suradnika'}
            value={associateStatistics[0]?.totalAssociates}
          />
        )}
        {projectUserStatistics && (
          <>
            <DashboardSingleWidget
              type={'Activity'}
              title={'Ukupno aktivnosti suradnika'}
              value={projectUserStatistics?.associatesTotalActivities}
            />
            <DashboardSingleWidget
              type={'Users'}
              title={'Aktivnosti koje se izvode'}
              value={projectUserStatistics.associatesActiveActivities}
            />
            <DashboardSingleWidget
              type={'Associate'}
              title={'Aktivnosti koje se ne izvode'}
              value={projectUserStatistics.associatesInactiveActivities}
            />
          </>
        )}
      </Row>
      <Row>
        <AssociatesDashboardTable data={associateStatistics} />
      </Row>
    </Container>
  );
}
