import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { GoDotFill } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';

import { deleteSchoolYear } from '../../api/api/api.ts';
import { toastError, toastSuccess } from '../../utils/toast.ts';

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
  const queryClient = useQueryClient();
  const onDeleteClick = async (schoolYear) => {
    try {
      await deleteSchoolYear(schoolYear.id);
      await queryClient.invalidateQueries(['getAllSchoolYears']);
      toastSuccess('Uspjeno obrisana skolska godina');
    } catch (e) {
      toastError('Greska pri brisanju skolske godine');
    }
  };

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
                  <MdDelete size={18} color={'#00193f'} onClick={() => onDeleteClick(schoolYear)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
