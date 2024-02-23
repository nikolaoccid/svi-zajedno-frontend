import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { GoDotFill } from 'react-icons/go';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderText } from '../user-list/user-list-container.tsx';

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
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
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
`;
export function UserActivityTable({ activities }: { activities: any }) {
  const queryClient = useQueryClient();
  const { startYear } = useParams();
  const { data: schoolYear } = useSchoolYear(parseInt(startYear ?? '0') ?? 0);
  const navigate = useNavigate();

  const disenrollActivity = async (activity) => {
    try {
      await api.updateStudentOnActivity(activity.id.toString(), {
        id: activity.id,
        activityStatus: 'inactive',
        studentOnSchoolYearId: activity.studentOnSchoolYearId,
      });
      await queryClient.invalidateQueries(['getStudentOnActivities']);
      toastSuccess('Uspjesno ispisan s aktivnosti');
    } catch (e) {
      toastError('Neuspjesno ispisivanje s aktivnosti');
      console.log(e);
    }
  };
  const enrollActivity = async (activity) => {
    try {
      await api.updateStudentOnActivity(activity.id.toString(), {
        id: activity.id,
        activityStatus: 'active',
        studentOnSchoolYearId: activity.studentOnSchoolYearId,
      });
      await queryClient.invalidateQueries(['getStudentOnActivities']);
      toastSuccess('Uspjesno upisan na aktivnost');
    } catch (e) {
      toastError('Neuspjesno upisivanje na aktivnost');
      console.log(e);
    }
  };
  const deleteActivityEnrollment = async (activity) => {
    console.log('deleteActivityEnrollment', activity);
    try {
      await api.deleteStudentOnActivity(activity.id);
      await queryClient.invalidateQueries(['getStudentOnActivities']);
      toastSuccess('Uspjesno obrisan korisnik na aktivnosti');
    } catch (e) {
      toastError('Neuspjesno brisanje korisnika na aktivnost');
      console.log(e);
    }
  };
  if (!activities) {
    return null;
  }
  return (
    <TableContainer>
      <Table>
        <tbody>
          {activities &&
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <Icon onClick={() => onRowClick(activity)}>
                  <GoDotFill size={18} color={'#green'} />
                </Icon>
                <TableData onClick={() => onRowClick(activity)}>{activity?.activity?.activityName}</TableData>
                <TableData onClick={() => onRowClick(activity)}>
                  {activity?.activity?.projectAssociate?.clubName}
                </TableData>
                <TableData onClick={() => onRowClick(activity)}>
                  {activity?.activity?.activityPrice > 0 ? activity.activity.activityPrice + 'EUR' : 'Besplatno'}
                </TableData>
                <Icon>
                  <MdEdit size={18} color={'#00193f'} onClick={() => onEditClick(activity)} />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
