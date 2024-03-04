import { useAsync } from 'react-async-hook';
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';
import { useActivities } from './hooks/use-activities.ts';
import { useCreateStudentOnActivity } from './hooks/use-create-student-on-activity.ts';
import { StudentOnActivityTable } from './student-on-activity-table.tsx';

export const ManageStudentOnActivity = ({ onClose, query }: { onClose?: () => void; query: string }) => {
  const { startYear, userId } = useParams();
  const startYearInt = parseInt(startYear ?? '0');
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYearInt);
  const { data: projectUser, isLoading: isLoadingProjectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear, isLoading: isLoadingStudentOnSchoolYear } = useStudentOnSchoolYear(
    schoolYear ? schoolYear?.id : 0,
    projectUser?.id,
  );
  const { execute: createStudentOnActivity, loading: isLoadingCreateStudentOnActivity } = useCreateStudentOnActivity();
  const { getActivities, activities, isLoading: isLoadingActivities } = useActivities();

  useAsync(async () => {
    await getActivities(
      query,
      'active',
      schoolYear ? schoolYear?.id : 0,
      studentOnSchoolYear ? (studentOnSchoolYear as any).id : 0,
    );
  }, [schoolYear, projectUser, studentOnSchoolYear, query]);

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
        <StudentOnActivityTable activities={activities} onActivityClick={handleActivityClick} />
      </CenterContent>
    </PageContainer>
  );
};
