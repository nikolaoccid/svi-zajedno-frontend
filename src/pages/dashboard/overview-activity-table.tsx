import styled from '@emotion/styled';
import { GoDotFill } from 'react-icons/go';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
  }
`;
const TableData = styled.td`
  padding-top: 10px;
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
export function OverviewActivityTable({ data }: { data: any[] }) {
  return (
    <TableContainer>
      <Table>
        <tbody>
          {data.map(
            (category, i) =>
              category.totalAssociatesPerCategory > 0 && (
                <TableRow key={i}>
                  <Icon>
                    <GoDotFill size={18} color={'#00193f'} />
                  </Icon>
                  <TableData>{category.categoryName}</TableData>
                  <TableData>{category.totalAssociatesPerCategory}</TableData>
                </TableRow>
              ),
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
