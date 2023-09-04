import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';

import { Submenu } from '../../../components/submenu/submenu.tsx';
import { Button, CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useGetCategories } from '../../project-associate/manage-project-associate/hooks/use-get-categories.ts';
import {
  ColoredTableRow,
  StyledTable,
} from '../../project-associate/project-associate-search-view/project-associate-search-view.tsx';

const TableWrapper = styled.div`
  width: 100%;
`;
export const CategoriesView = () => {
  const navigate = useNavigate();
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const { data: categories, isLoading } = useGetCategories();
  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <PulseLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <Submenu />
        <h1>Kategorije</h1>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Kategorija</th>
                <th>Akcija</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category, index) => (
                <ColoredTableRow key={(category as any).id} isEven={index % 2 === 0}>
                  <td>{(category as any).categoryName}</td>
                  <td>
                    <Button
                      onClick={() =>
                        navigate(`/${schoolYear ? schoolYear[0]?.startYear : 0}/category/${(category as any).id}/edit`)
                      }
                    >
                      Uredi
                    </Button>
                  </td>
                </ColoredTableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableWrapper>
      </CenterContent>
    </PageContainer>
  );
};
