import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { Navigation } from '../../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from './add-new-button.tsx';
import { Pagination } from './pagination.tsx';
import { UsersTable } from './user-table.tsx';

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
const Select = styled.select`
  font-family: Axiforma;
  font-size: 15px;
  font-weight: bold;
  max-width: 380px;
  border-radius: 8px;
  background-color: #e0e9ff;

  appearance: none;
  background-image: url('/down-chevron.svg');
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.65rem auto;
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
export function UserList({
  users,
  setUserType,
  setSearchQuery,
  searchQuery,
  setCurrentPage,
}: {
  users: {
    items: [];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
  setUserType: (type: string) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  searchQuery: string;
}) {
  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();
  const handleSelectChange = (event) => {
    setUserType(event.target.value);
    setSearchQuery('');
  };

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Upravljanje korisnicima" />
        <UsersHeader>
          <HeaderTitle>Lista korisnika</HeaderTitle>
          <RowContainer>
            <Select name="users" id="user-select" onChange={handleSelectChange}>
              <option value="all">Svi korisnici</option>
              <option value="schoolYearUsers">Upisani korisnici na skolsku godinu</option>
            </Select>
            <GlobalSearch setSearchQuery={setSearchQuery} clearSearch={searchQuery === ''} />
            <AddNewButton text={'Dodaj korisnika'} onClick={() => navigate(`/${schoolYear?.startYear}/users/new`)} />
          </RowContainer>
          <Records>{(users as any)?.meta?.totalItems} Records found</Records>
        </UsersHeader>
        <Divider />
        <UsersTable users={users as any} />
        <Pagination
          totalPages={(users as any)?.meta?.totalPages}
          currentPage={(users as any)?.meta?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
