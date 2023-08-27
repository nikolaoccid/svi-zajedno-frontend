import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';

export const ManageStudentOnActivity = () => {
  const { startYear, userId, activityId } = useParams();
  const startYearInt = parseInt(startYear ?? '0');
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYearInt);
  const { data: projectUser, isLoading: isLoadingProjectUser } = useProjectUser(userId);

  if (isLoadingSchoolYear || isLoadingProjectUser) {
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  console.log(schoolYear, projectUser, activityId);
  return (
    <PageContainer>
      <CenterContent>
        <h1>ManageStudentOnActivity</h1>
        <input />
      </CenterContent>
    </PageContainer>
  );
};
