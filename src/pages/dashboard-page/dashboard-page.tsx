import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

export const DashboardNavLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`;
