import styled from '@emotion/styled';

import { GlobalSearch } from '../global-search/global-search.tsx';
import { UserBadge } from '../user-badge/user-badge.tsx';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 25px;
  box-shadow: 0 1px 5px -1px gray;
  border-top-right-radius: 15px;
`;
const HeaderText = styled.span`
  font-family: 'Axiforma';
  font-weight: bold;
  font-size: 24px;
`;

export function DashboardHeader({ text }: { text: string }) {
  return (
    <Container>
      <HeaderText>{text}</HeaderText>
      <GlobalSearch />
      <UserBadge />
    </Container>
  );
}
