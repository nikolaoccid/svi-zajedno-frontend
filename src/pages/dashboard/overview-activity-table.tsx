import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
  overflow-x: auto;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
  }
`;
const TableData = styled.td`
  padding-top: 10px;
  text-align: center;
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
`;
const HeaderData = styled.th`
  font-weight: bold;
  text-wrap: normal;
  word-wrap: break-word;
`;
const TableDataLeft = styled.td`
  text-align: left;
`;
export function OverviewActivityTable({ data }: { data: any[] }) {
  const numberOfRows = 10;
  const filteredData = data.slice(0, numberOfRows);
  const { t } = useTranslation();
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <HeaderData>{t('Associates in category')}</HeaderData>
            <HeaderData>{t('Users in category')}</HeaderData>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(
            (category, i) =>
              category.totalAssociatesPerCategory > 0 && (
                <TableRow key={i}>
                  <Icon>
                    <GoDotFill size={18} color={'#00193f'} />
                  </Icon>
                  <TableDataLeft>{category.categoryName}</TableDataLeft>
                  <TableData>{category.totalAssociatesPerCategory}</TableData>
                  <TableData>{category.totalUsersPerCategory}</TableData>
                </TableRow>
              ),
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
