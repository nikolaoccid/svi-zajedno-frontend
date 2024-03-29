import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { useSchoolYear } from '../../pages/dashboard-page/hooks/use-fetch-school-year.ts';
import { UserBadge } from '../user-badge/user-badge.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 25px;
  box-shadow: 0 1px 5px -1px gray;
  border-top-right-radius: 15px;
  font-family: Axiforma;
`;
const HeaderText = styled.span`
  font-weight: bold;
  font-size: 24px;
`;
const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export function DashboardHeader({ text }: { text: string }) {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  return (
    <Container>
      <Column>
        <HeaderText>{text}</HeaderText>
        <HeaderSubtext>
          Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
        </HeaderSubtext>
      </Column>
      <UserBadge />
    </Container>
  );
}
