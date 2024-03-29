import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { Navigation } from '../../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetCategories } from '../../project-associate/manage-project-associate/hooks/use-get-categories.ts';
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
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: categories, refetch } = useGetCategories(currentPage, searchQuery);

  useAsync(async () => {
    await refetch();
  }, [searchQuery, currentPage]);

  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <Navigation />
      <ContentContainer>
        <DashboardHeader text={t('Manage categories')} />
        <UsersHeader>
          <HeaderTitle>{t('Categories list')}</HeaderTitle>
          <RowContainer>
            <GlobalSearch setSearchQuery={onSearch} />
            <AddNewButton
              text={t('Add category')}
              onClick={() => navigate(`/${schoolYear?.startYear}/categories/new`)}
              Icon={BiSolidCategoryAlt}
            />
          </RowContainer>

          <Records>
            {(categories as any)?.meta?.totalItems} {t('records found')}
          </Records>
        </UsersHeader>
        <Divider />
        <CategoriesTable data={categories as any} />
        <Pagination
          totalPages={(categories as any)?.meta?.totalPages}
          currentPage={(categories as any)?.meta?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
