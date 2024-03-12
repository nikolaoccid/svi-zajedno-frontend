import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { api } from '../../../api';
import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { Navigation } from '../../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from '../../project-user/user-list/add-new-button.tsx';
import { Pagination } from '../../project-user/user-list/pagination.tsx';
import { Divider, HeaderTitle, UsersHeader } from '../../project-user/user-list/user-list.tsx';
import { CategoriesTable } from './categories-table.tsx';
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
export function CategoriesPage() {
  const [categories, setCategories] = useState({
    items: [],
    meta: { totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 0, currentPage: 1 },
  });

  const [searchQuery, setSearchQuery] = useState('');
  const setCurrentPage = (page: number) => {
    setCategories((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };

  useAsync(async () => {
    const response = await api.getCategories(categories.meta.currentPage, searchQuery);
    setCategories(response as any);
  }, [searchQuery, categories.meta.currentPage]);

  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();

  const onSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text="Upravljanje kategorijama" />
        <UsersHeader>
          <HeaderTitle>Lista kategorija</HeaderTitle>
          <RowContainer>
            <GlobalSearch setSearchQuery={onSearch} />
            <AddNewButton
              text={'Dodaj kategoriju'}
              onClick={() => navigate(`/${schoolYear?.startYear}/categories/new`)}
              Icon={BiSolidCategoryAlt}
            />
          </RowContainer>

          <Records>{categories.meta.totalItems} Records found</Records>
        </UsersHeader>
        <Divider />
        <CategoriesTable data={categories} />
        <Pagination
          totalPages={categories.meta.totalPages}
          currentPage={categories.meta.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
