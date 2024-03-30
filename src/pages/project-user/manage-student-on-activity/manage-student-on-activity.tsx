import styled from '@emotion/styled';
import { ChangeEventHandler, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { Spinner } from '../../../components/spinner/spinner.tsx';
import { backendFormattedDate } from '../../../utils/backend-formatted-date.ts';
import { frontendFormattedDate } from '../../../utils/frontend-formatted-date.ts';
import { CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from '../user-view/hooks/use-project-user.ts';
import { useActivities } from './hooks/use-activities.ts';
import { useCreateStudentOnActivity } from './hooks/use-create-student-on-activity.ts';
import { StudentOnActivityTable } from './student-on-activity-table.tsx';

const Input = styled.input`
  font-size: 14px;
  font-weight: normal;
  font-family: Axiforma;
`;
const Section = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
  padding: 10px 25px 0 25px;
`;
const ContentContainer = styled(PageContainer)`
  width: 100%;
`;
export const ManageStudentOnActivity = ({ onClose, query }: { onClose?: () => void; query: string }) => {
  const { t } = useTranslation();
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
  const [enrollmentDate, setEnrollmentDate] = useState(frontendFormattedDate());
  const [actualActivityPrice, setActualActivityPrice] = useState(0);

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
      actualActivityCost: actualActivityPrice,
      studentOnSchoolYearId: studentOnSchoolYear ? (studentOnSchoolYear as any).id : 0,
      enrollmentDate: backendFormattedDate(enrollmentDate),
    });
    onClose?.();
  };
  const handleDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnrollmentDate(event.target.value);
  };

  if (
    isLoadingSchoolYear ||
    isLoadingCreateStudentOnActivity ||
    isLoadingProjectUser ||
    isLoadingStudentOnSchoolYear ||
    isLoadingActivities
  ) {
    return <Spinner SpinnerComponent={PuffLoader} color={'#2196f3'} />;
  }
  return (
    <ContentContainer>
      <CenterContent>
        <Section>
          <label> {t('Enrollment date')}</label>
          <Input type="date" value={enrollmentDate} onChange={handleDateChange} />
        </Section>
        <Section>
          <label> {t('Actual activity price (EUR)')}</label>
          <Input
            type="number"
            value={actualActivityPrice}
            onChange={(e) => setActualActivityPrice(parseInt(e.target.value))}
          />
        </Section>

        <StudentOnActivityTable activities={activities} onActivityClick={handleActivityClick} />
      </CenterContent>
    </ContentContainer>
  );
};
