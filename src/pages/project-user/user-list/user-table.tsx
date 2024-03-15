import styled from '@emotion/styled';
import { GoDotFill } from 'react-icons/go';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';

const TableContainer = styled.div`
  height: 100%;
  padding: 0px 25px 0 25px;
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
export function UsersTable({
  users,
}: {
  users: {
    items: any[];
    meta: { totalItems: number; itemCount: number; itemsPerPage: number; totalPages: number; currentPage: number };
  };
}) {
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const navigate = useNavigate();
  const onEditClick = (user) => {
    navigate(`/${schoolYear?.startYear}/users/${user.id}/edit`);
  };
  const onRowClick = (user) => {
    navigate(`/${schoolYear?.startYear}/users/${user.id}`);
  };
  const userStatusOnSchoolYear = (user) => {
    if (user?.schoolYearStatus) {
      return user.schoolYearStatus;
    } else {
      const currentSchoolYear = user.studentOnSchoolYear.find((sy) => {
        return schoolYear?.id === sy.schoolYearId;
      });
      return currentSchoolYear ? currentSchoolYear.status : null;
    }
  };
  const getIconColor = (status) => {
    if (status === 'active') {
      return 'green';
    } else if (status === 'inactive') {
      return 'red';
    } else {
      return '#00193f';
    }
  };
  const getStatusColorForUser = (user) => {
    const statusColor = userStatusOnSchoolYear(user);
    return getIconColor(statusColor);
  };
  return (
    <TableContainer>
      <Table>
        <tbody>
          {users &&
            users.items.map((user) => (
              <TableRow key={user.id}>
                <Icon onClick={() => onRowClick(user)}>
                  <GoDotFill size={18} color={getStatusColorForUser(user)} />
                </Icon>
                <TableData onClick={() => onRowClick(user)}>
                  {user.childName} {user.childSurname}
                </TableData>
                <TableData onClick={() => onRowClick(user)}>
                  {user.guardianName} {user.guardianSurname}
                </TableData>
                <TableData onClick={() => onRowClick(user)}>{user.dateOfBirth}</TableData>
                <Icon>
                  <MdEdit size={18} color={'#00193f'} onClick={() => onEditClick(user)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
