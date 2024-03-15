import styled from '@emotion/styled';
import { GoDotFill } from 'react-icons/go';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import { CenterContent, PageContainer } from '../common-styles/common-styles.ts';
import { useSelectedSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
  width: 100%;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
    cursor: default;
  }
`;
const TableDataLeft = styled.td`
  text-align: left;
`;
const Table = styled.table`
  font-family: Axiforma;
  font-size: 14px;
  color: #696969;
  font-weight: normal;
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
  cursor: pointer;
`;
export function SchoolYearsTable({
  data,
}: {
  data: {
    items: any[];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
}) {
  const navigate = useNavigate();
  const { data: schoolYear, isLoading } = useSelectedSchoolYear();
  const onEditClick = (category) => {
    navigate(`/${schoolYear?.startYear}/categories/${category.id}/edit`);
  };
  const onDeleteClick = (category) => {
    console.log('delete category click', category);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <CenterContent>
          <GridLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <TableContainer>
      <Table>
        <tbody>
          {data &&
            data.items.map((schoolYear, i) => (
              <TableRow key={i}>
                <Icon>
                  <GoDotFill size={18} color={'#00193f'} />
                </Icon>
                <TableDataLeft>
                  {schoolYear.startYear} / {schoolYear.endYear}
                </TableDataLeft>
                <Icon>
                  <MdEdit size={18} color={'#00193f'} onClick={() => onEditClick(schoolYear)} />
                  <MdDelete size={18} color={'#00193f'} onClick={() => onDeleteClick(schoolYear)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
