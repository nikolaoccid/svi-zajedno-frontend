import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { GoDotFill } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { Button, CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from './hooks/use-project-user.ts';

const TableContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px 25px 0 25px;
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
  gap: 12px;
`;
export function UserActivityTable({ activities }: { activities: any }) {
  const queryClient = useQueryClient();
  const { startYear, userId } = useParams();
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear.id) ?? 0;
  const { data: projectUser, isLoading } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);

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
  const onRowClick = (activity) => {
    console.log('onRowClick', activity);
  };

  if (!activities) {
    return null;
  }

  if (isLoading || isLoadingSchoolYear) {
    return (
      <PageContainer>
        <CenterContent>
          <ClockLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <TableContainer>
      <Table>
        <tbody>
          {activities &&
            activities.map((activity) => (
              <TableRow key={activity.id}>
                <Icon onClick={() => onRowClick(activity)}>
                  <GoDotFill size={18} color={activity.activityStatus === 'active' ? 'green' : 'red'} />
                </Icon>
                <TableData onClick={() => onRowClick(activity)}>{activity?.activity?.activityName}</TableData>
                <TableData onClick={() => onRowClick(activity)}>
                  {activity?.activity?.projectAssociate?.clubName}
                </TableData>
                <TableData onClick={() => onRowClick(activity)}>
                  {activity?.activity?.activityPrice > 0 ? activity.activity.activityPrice + 'EUR' : 'Besplatno'}
                </TableData>
                <TableData>
                  {activity.activityStatus === 'active' && (
                    <Button
                      backgroundColor={'#d9534f'}
                      onClick={() => disenrollActivity(activity)}
                      disabled={studentOnSchoolYear ? (studentOnSchoolYear as any)?.status === 'inactive' : false}
                    >
                      Ispisi
                    </Button>
                  )}
                  {activity.activityStatus === 'inactive' && (
                    <Button
                      onClick={() => enrollActivity(activity)}
                      disabled={studentOnSchoolYear ? (studentOnSchoolYear as any)?.status === 'inactive' : false}
                    >
                      Upisi
                    </Button>
                  )}
                </TableData>
                <Icon>
                  <MdDelete
                    size={18}
                    color={'#00193f'}
                    onClick={() =>
                      (studentOnSchoolYear as any)?.status === 'active' ? deleteActivityEnrollment(activity) : undefined
                    }
                    style={{ margin: '10px' }}
                  />
                </Icon>
              </TableRow>
            ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
