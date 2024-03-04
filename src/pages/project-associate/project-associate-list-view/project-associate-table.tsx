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
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
`;
export function ProjectAssociateTable({
  data,
}: {
  data: {
    items: any[];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
}) {
  return (
    <TableContainer>
      <Table>
        <tbody>
          {data.items.map((club, i) => (
            <TableRow key={i}>
              <Icon>
                <GoDotFill size={18} color={'#00193f'} />
              </Icon>
              <TableDataLeft>{club.clubName}</TableDataLeft>
              <TableData>{club.contactPerson}</TableData>
              <TableData>{club.email}</TableData>
              <TableData>{club.mobilePhone}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
