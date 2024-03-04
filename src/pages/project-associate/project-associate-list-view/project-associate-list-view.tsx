import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { Navigation } from '../../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from '../../project-user/user-list/add-new-button.tsx';
import { Pagination } from '../../project-user/user-list/pagination.tsx';
import { ProjectAssociateTable } from './project-associate-table.tsx';

export const UsersHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 25px 10px;
  gap: 25px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
    gap: 20px;
  }
`;
export const HeaderTitle = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-style: 20px;
`;
export const Divider = styled.hr`
  width: 100%;
  border: 1px solid #ececec;
  margin: 0;
`;
const Records = styled.span`
  font-family: Axiforma;
  font-size: 15px;
  font-weight: 400;
`;
export function ProjectAssociateListView({
  associates,
  setSearchQuery,
  searchQuery,
  setCurrentPage,
}: {
  associates: {
    items: any[];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
  setSearchQuery: (type: string) => void;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
}) {
  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Upravljanje suradnicima" />
        <UsersHeader>
          <HeaderTitle>Lista suradnika</HeaderTitle>
          <RowContainer>
            <GlobalSearch setSearchQuery={setSearchQuery} clearSearch={searchQuery === ''} />
            <AddNewButton text={'Dodaj suradnika'} onClick={() => navigate(`/${schoolYear?.startYear}/users/new`)} />
          </RowContainer>

          <Records>{associates.meta.totalItems} Records found</Records>
        </UsersHeader>
        <Divider />
        <ProjectAssociateTable data={associates} />
        <Pagination
          totalPages={associates.meta.totalPages}
          currentPage={associates.meta.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
