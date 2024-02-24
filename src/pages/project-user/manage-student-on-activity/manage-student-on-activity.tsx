import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { GoDotFill } from 'react-icons/go';
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { GlobalSearch } from '../../../components/global-search/global-search.tsx';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';
import { useActivities } from './hooks/use-activities.ts';
import { useCreateStudentOnActivity } from './hooks/use-create-student-on-activity.ts';

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
  width: 100%;
`;
const Icon = styled.td`
  width: 2%;
  padding-top: 10px;
  padding-right: 10px;
  white-space: nowrap;
  gap: 12px;
`;

export const ManageStudentOnActivity = ({ onClose }: { onClose?: () => void }) => {
  const { startYear, userId } = useParams();
  const startYearInt = parseInt(startYear ?? '0');
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYearInt);
  const { data: projectUser, isLoading: isLoadingProjectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear, isLoading: isLoadingStudentOnSchoolYear } = useStudentOnSchoolYear(
    schoolYear ? schoolYear?.id : 0,
    projectUser?.id,
  );
  const { execute: createStudentOnActivity, loading: isLoadingCreateStudentOnActivity } = useCreateStudentOnActivity();
  const [query, setQuery] = useState<any>(undefined);

  const { getActivities, activities, isLoading: isLoadingActivities } = useActivities();

  useAsync(async () => {
    await getActivities(
      query,
      'active',
      schoolYear ? schoolYear?.id : 0,
      studentOnSchoolYear ? (studentOnSchoolYear as any).id : 0,
    );
  }, [schoolYear, projectUser, studentOnSchoolYear, query]);

  useEffect(() => {
    console.log('query', query);
  }, [query]);

  const handleActivityClick = async (item) => {
    await createStudentOnActivity({
      activityId: item.id,
      activityStatus: 'active',
      studentOnSchoolYearId: studentOnSchoolYear ? (studentOnSchoolYear as any).id : 0,
    });
    onClose?.();
  };

  if (
    isLoadingSchoolYear ||
    isLoadingCreateStudentOnActivity ||
    isLoadingProjectUser ||
    isLoadingStudentOnSchoolYear ||
    isLoadingActivities
  ) {
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    <PageContainer>
      <CenterContent>
        <GlobalSearch setSearchQuery={setQuery} />
        <TableContainer>
          <Table>
            <tbody>
              {activities && activities?.length !== 0 ? (
                activities.map((item) => (
                  <TableRow key={item.id} onClick={() => handleActivityClick(item)}>
                    <Icon>
                      <GoDotFill size={18} color={'#00193f'} />
                    </Icon>
                    <TableData>{item.projectAssociate.clubName}</TableData>
                    <TableData>{item.activityName}</TableData>
                    <TableData>{item.activityPrice ? item.activityPrice + '€' : 'Besplatno'}</TableData>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <TableData>Nema dostupnih aktivnosti.</TableData>
                </tr>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </CenterContent>
    </PageContainer>
  );
};
