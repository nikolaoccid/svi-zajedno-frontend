import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';

import { DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { ProjectUserFlyouts } from './project-user-flyouts.tsx';
import { useGetProjectUserByPageAndQuery, useGetProjectUsersBySchoolYear } from './useGetProjectUserByPageAndQuery.ts';
import { UserList } from './user-list.tsx';

export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 24px;
`;
export const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;

export function UserListContainer() {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState('all');

  const { data: apiUsers, refetch: refetchByPageAndQuery } = useGetProjectUserByPageAndQuery(
    currentPage,
    searchQuery,
    schoolYear?.id,
  );
  const { data: apiUsersAll, refetch } = useGetProjectUsersBySchoolYear(
    schoolYear?.id.toString() ?? '0',
    currentPage,
    searchQuery,
    'active',
    'dateOfEnrollment',
  );

  useAsync(async () => {
    if (userType === 'all') {
      await refetchByPageAndQuery();
    } else {
      await refetch();
    }
  }, [userType, searchQuery, currentPage, schoolYear]);

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <UserList
        users={userType === 'all' ? apiUsers : (apiUsersAll as any)}
        setUserType={setUserType}
        setSearchQuery={onSearch}
        searchQuery={searchQuery}
        setCurrentPage={setCurrentPage}
      />

      <ProjectUserFlyouts />
    </DashboardContainer>
  );
}
