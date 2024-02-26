import styled from '@emotion/styled';
import { GoDotFill } from 'react-icons/go';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
  width: 100%;
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
const TableDataLeft = styled.td`
  text-align: left;
`;
const Table = styled.table`
  font-family: Axiforma;
  font-size: 14px;
  color: #696969;
  font-weight: normal;
`;
const HeaderData = styled.th`
  font-weight: bold;
  text-wrap: normal;
  word-wrap: break-word;
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
`;
export function AssociatesDashboardTable({ data }: { data: any[] }) {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <HeaderData>Suradnika u kategoriji</HeaderData>
            <HeaderData>Besplatne aktivnosti</HeaderData>
            <HeaderData>Korisnici na besplatnim aktivnostima</HeaderData>
            <HeaderData>Placene aktivnosti</HeaderData>
            <HeaderData>Korisnici na placenim aktivnostima</HeaderData>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (category, i) =>
              category.totalAssociatesPerCategory > 0 && (
                <TableRow key={i}>
                  <Icon>
                    <GoDotFill size={18} color={'#00193f'} />
                  </Icon>
                  <TableDataLeft>{category.categoryName}</TableDataLeft>
                  <TableData>{category.totalAssociatesPerCategory}</TableData>
                  <TableData>{category.totalFreeActivities}</TableData>
                  <TableData>{category.usersAttendingFreeActivities}</TableData>
                  <TableData>{category.totalPaidActivities}</TableData>
                  <TableData>{category.usersAttendingPaidActivities}</TableData>
                </TableRow>
              ),
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
}
