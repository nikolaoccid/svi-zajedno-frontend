import styled from '@emotion/styled';
import { useState } from 'react';

import { DashboardHeader } from '../../components/dashboard-header/dashboard-header.tsx';
import { Navigation } from '../../components/navigation/navigation.tsx';
import { AssociatesDashboard } from './associates-dashboard.tsx';
import { DashboardNavigation, navEnum } from './dashboard-navigation.tsx';
import { Overview } from './overview.tsx';
import { UsersDashboard } from './users-dashboard.tsx';
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
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 40px;
`;
export function Dashboard() {
  const [nav, setNav] = useState('overview');
  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Kontrolna ploca" />
        <InnerContainer>
          <DashboardNavigation setNav={setNav} nav={nav} />
          <Overview show={nav === navEnum.overview} />
          <UsersDashboard show={nav === navEnum.users} />
          <AssociatesDashboard show={nav === navEnum.associates} />
        </InnerContainer>
      </ContentContainer>
    </DashboardContainer>
  );
}
