import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { DashboardHeader } from '../../components/dashboard-header/dashboard-header.tsx';
import { Navigation } from '../../components/navigation/navigation.tsx';
import { useSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { BigBanner } from '../statistics/components/big-banner/big-banner.tsx';
import { SmallBanner } from '../statistics/components/small-banner/small-banner.tsx';
import { useAssociateStatistics } from '../statistics/hooks/use-associate-statistics.ts';
import { useProjectUserStatistics } from '../statistics/hooks/use-project-user-statistics.ts';
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 5px;
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export function Dashboard() {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const { data: associateStatisticsAPI, isSuccess } = useAssociateStatistics(schoolYear ? schoolYear?.id : 0);
  const { data: projectUserStatisticsAPI } = useProjectUserStatistics(schoolYear ? schoolYear?.id : 0);

  const associateStatistics = associateStatisticsAPI as any;
  const projectUserStatistics = projectUserStatisticsAPI as any;
  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Kontrolna ploca" />
        {isSuccess && (
          <BigBanner
            text="Procijenjena vrijednost projekta"
            count={projectUserStatistics.totalProjectValue}
            euro={true}
          />
        )}
        {associateStatistics && <SmallBanner text="Ukupno suradnika" count={associateStatistics[0]?.totalAssociates} />}
        {projectUserStatistics && (
          <SmallBanner text="Ukupno aktivnosti" count={projectUserStatistics?.totalActivities} />
        )}
      </ContentContainer>
    </DashboardContainer>
  );
}
