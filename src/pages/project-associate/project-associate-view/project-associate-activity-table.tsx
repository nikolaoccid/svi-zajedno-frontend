import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { GoDotFill } from 'react-icons/go';
import { MdDelete } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockLoader } from 'react-spinners';

import { api } from '../../../api';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';

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
export function ProjectAssociateActivityTable({ activities }: { activities: any }) {
  const navigate = useNavigate();
  const { startYear, projectAssociateId } = useParams();
  const queryClient = useQueryClient();
  const deleteAssociateActivity = async (activity) => {
    try {
      await api.deleteActivity(activity.id);
      await queryClient.invalidateQueries(['getProjectAssociateById']);
      toastSuccess('Uspjesno obrisana aktivnost');
    } catch (e) {
      toastError('Brisanje aktivnosti nije uspjesno');
      console.log(e);
    }
  };
  const onRowClick = (activity) =>
    navigate(`/${startYear}/project-associates/${projectAssociateId}/activities/${activity?.id}/edit`);

  if (!activities) {
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
                  <GoDotFill
                    size={18}
                    color={
                      activity.activityStatus === 'active'
                        ? 'green'
                        : activity.activityStatus === 'inactive'
                        ? 'red'
                        : '#ece61b'
                    }
                  />
                </Icon>
                <TableData onClick={() => onRowClick(activity)}>{activity?.activityName}</TableData>
                <TableData onClick={() => onRowClick(activity)}>{activity?.projectAssociate?.clubName}</TableData>
                <TableData onClick={() => onRowClick(activity)}>
                  {activity.activityPrice > 0 ? activity.activityPrice + 'EUR' : 'Besplatno'}
                </TableData>
                <Icon>
                  <MdDelete
                    size={18}
                    color={'#00193f'}
                    onClick={() => deleteAssociateActivity(activity)}
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
