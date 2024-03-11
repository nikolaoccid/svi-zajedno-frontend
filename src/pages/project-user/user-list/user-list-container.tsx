import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';

import { getProjectUserByPageAndQuery, getProjectUsersBySchoolYear } from '../../../api/api.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { UserFlyouts } from './user-flyouts.tsx';
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
  const [userType, setUserType] = useState('all');

  const [users, setUsers] = useState({
    items: [],
    meta: { totalItems: 1, itemCount: 1, itemsPerPage: 1, totalPages: 1, currentPage: 1 },
  } as any);

  const setCurrentPage = (page: number) => {
    setUsers((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };

  useAsync(async () => {
    let res;
    if (userType === 'all') {
      res = await getProjectUserByPageAndQuery(users.meta.currentPage, searchQuery);
    } else {
      res = await getProjectUsersBySchoolYear(
        schoolYear?.id.toString() ?? '0',
        users.meta.currentPage,
        searchQuery,
        'active',
        'dateOfEnrollment',
      );
    }
    setUsers(res);
  }, [userType, searchQuery, users.meta.currentPage, schoolYear]);

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <div>
      <UserList
        users={users}
        setUserType={setUserType}
        setSearchQuery={onSearch}
        searchQuery={searchQuery}
        setCurrentPage={setCurrentPage}
      />
      <UserFlyouts />
    </div>
  );
}
