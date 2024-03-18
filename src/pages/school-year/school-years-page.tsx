import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../components/global-search/global-search.tsx';
import { Navigation } from '../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from '../project-user/user-list/add-new-button.tsx';
import { Pagination } from '../project-user/user-list/pagination.tsx';
import { Divider, HeaderTitle, UsersHeader } from '../project-user/user-list/user-list.tsx';
import { useSchoolYears } from './choose-school-year/hooks/use-fetch-school-years.ts';
import { SchoolYearsTable } from './school-years-table.tsx';

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 20px;
  }
`;
const Records = styled.span`
  font-family: Axiforma;
  font-size: 15px;
  font-weight: 400;
`;
export function SchoolYearsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();
  const { data: schoolYears, refetch } = useSchoolYears(currentPage, searchQuery);

  useAsync(async () => {
    await refetch();
  }, [searchQuery, currentPage]);

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Upravljanje školskim godinama" />
        <UsersHeader>
          <HeaderTitle>Lista školskih godina</HeaderTitle>
          <RowContainer>
            <GlobalSearch setSearchQuery={onSearch} />
            <AddNewButton
              text={'Dodaj školsku godinu'}
              onClick={() => navigate(`/${schoolYear?.startYear}/school-years/new`)}
              Icon={BiSolidCategoryAlt}
            />
          </RowContainer>

          <Records>{(schoolYears as any)?.meta?.totalItems} Records found</Records>
        </UsersHeader>
        <Divider />
        <SchoolYearsTable data={schoolYears as any} />
        <Pagination
          totalPages={(schoolYears as any)?.meta?.totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
