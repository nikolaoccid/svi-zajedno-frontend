import styled from '@emotion/styled';
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
`;
export function UsersDashboard({ show }: { show: boolean }) {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const projectUserStatistics = projectUserStatisticsAPI as any;
  return (
    <Container show={show}>
      <Row>
        {projectUserStatistics && (
          <>
            <DashboardSingleWidget type={'Users'} title={'Ukupno korisnika'} value={projectUserStatistics.totalUsers} />
            <DashboardSingleWidget
              type={'Activity'}
              title={'Aktivni korisnici'}
              value={projectUserStatistics.activeUsers}
            />
            <DashboardSingleWidget
              type={'Value'}
              title={'Ukupan broj korisnickih aktivnosti'}
              value={projectUserStatistics.totalActivities}
            />
            <DashboardSingleWidget
              type={'Associate'}
              title={'Broj upisanih aktivnosti'}
              value={projectUserStatistics.activeActivities}
            />
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
              color="#d77b28"
            />
          </Column>
        )}
        <Column>
          <HeaderTitle>Korisnici po pravu upisa</HeaderTitle>
          {projectUserStatistics && (
            <PieChartComponent
              data={[
                { name: 'Direktni upis', value: projectUserStatistics.protectionTypes.zmn },
                { name: 'Preporuka', value: projectUserStatistics.protectionTypes.preporuka },
                { name: 'Udomitelji', value: projectUserStatistics.protectionTypes.udomiteljstvo },
              ]}
              color="#004279"
            />
          )}
        </Column>
      </Row>
      <Row>
        <Column>
          <HeaderTitle>Korisnici po spolu</HeaderTitle>
          {projectUserStatistics && (
            <PieChartComponent
              data={[
                { name: 'zensko', value: projectUserStatistics.femaleUsers },
                { name: 'musko', value: projectUserStatistics.maleUsers },
              ]}
              color="#8884d8"
            />
          )}
        </Column>
        <Column>
          <HeaderTitle>Korisnici po godinama</HeaderTitle>
          {projectUserStatistics && projectUserStatistics.ageGroups && (
            <PieChartComponent
              data={[
                { name: '<6', value: projectUserStatistics.ageGroups.under6 },
                { name: '7 - 12', value: projectUserStatistics.ageGroups.age7to12 },
                { name: '13 - 18', value: projectUserStatistics.ageGroups.age13to18 },
                { name: '19 - 24', value: projectUserStatistics.ageGroups.under6 },
              ]}
              color="#56a97a"
            />
          )}
        </Column>
      </Row>
    </Container>
  );
}
