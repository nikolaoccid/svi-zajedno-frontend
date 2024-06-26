import styled from '@emotion/styled';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DashboardHeader } from '../../../components/dashboard-header/dashboard-header.tsx';
import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { Navigation } from '../../../components/navigation/navigation.tsx';
import { ContentContainer, DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { AddNewButton } from '../../project-user/user-list/add-new-button.tsx';
import { Pagination } from '../../project-user/user-list/pagination.tsx';
import { Divider, HeaderTitle, UsersHeader } from '../../project-user/user-list/user-list.tsx';
import { ProjectAssociateTable } from '../project-associate-list-view/project-associate-table.tsx';
import { useGetProjectAssociates } from './useGetProjectAssociates.ts';
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
export function ProjectAssociateListView() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: associates, refetch: refetchAssociates } = useGetProjectAssociates(currentPage, searchQuery);

  useAsync(async () => {
    await refetchAssociates();
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
        <DashboardHeader text={t('Manage associates')} />
        <UsersHeader>
          <HeaderTitle>{t('Associates list')}</HeaderTitle>
          <RowContainer>
            <GlobalSearch setSearchQuery={onSearch} />
            <AddNewButton
              text={t('Add associate')}
              onClick={() => navigate(`/${schoolYear?.startYear}/project-associates/new`)}
            />
          </RowContainer>

          <Records>
            {(associates as any)?.meta?.totalItems} {t('records found')}
          </Records>
        </UsersHeader>
        <Divider />
        <ProjectAssociateTable data={associates as any} />
        <Pagination
          totalPages={(associates as any)?.meta?.totalPages}
          currentPage={(associates as any)?.meta?.currentPage}
          setCurrentPage={setCurrentPage}
        />
      </ContentContainer>
    </DashboardContainer>
  );
}
