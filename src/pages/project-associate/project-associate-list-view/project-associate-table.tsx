import styled from '@emotion/styled';
import { GoDotFill } from 'react-icons/go';
import { MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { GridLoader } from 'react-spinners';

import { Spinner } from '../../../components/spinner/spinner.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
  width: 100%;
  overflow-x: auto;
`;
const TableRow = styled.tr`
  &:hover {
    background-color: #faf9f9;
    border-radius: 10px;
    cursor: pointer;
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
  width: 100%;
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
  const navigate = useNavigate();
  const { data: schoolYear, isLoading } = useSelectedSchoolYear();
  const onEditClick = (club) => {
    navigate(`/${schoolYear?.startYear}/project-associates/${club.id}/edit`);
  };
  const onRowClick = (club) => {
    navigate(`/${schoolYear?.startYear}/project-associates/${club.id}`);
  };

  if (isLoading) {
    return <Spinner SpinnerComponent={GridLoader} color={'#2196f3'} />;
  }
  return (
    <TableContainer>
      <Table>
        <tbody>
          {data &&
            data.items.map((club, i) => (
              <TableRow key={i}>
                <Icon onClick={() => onRowClick(club)}>
                  <GoDotFill size={18} color={'#00193f'} />
                </Icon>
                <TableDataLeft onClick={() => onRowClick(club)}>{club.clubName}</TableDataLeft>
                <TableData onClick={() => onRowClick(club)}>{club.contactPerson}</TableData>
                <TableData onClick={() => onRowClick(club)}>{club.email}</TableData>
                <TableData onClick={() => onRowClick(club)}>{club.mobilePhone}</TableData>
                <Icon>
                  <MdEdit size={18} color={'#00193f'} onClick={() => onEditClick(club)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
