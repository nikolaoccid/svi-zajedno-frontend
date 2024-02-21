import styled from '@emotion/styled';

import { DashboardHeader } from '../../components/dashboard-header/dashboard-header.tsx';
import { Navigation } from '../../components/navigation/navigation.tsx';
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export function Dashboard() {
  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Kontrolna ploca" />
      </ContentContainer>
    </DashboardContainer>
  );
}
