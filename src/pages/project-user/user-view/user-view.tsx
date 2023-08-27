import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { Status } from '../../../components/status/status.tsx';
import { CenterContent, PageContainer, ProfileSubmenu, SecondaryButton } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import {
  Content,
  FullWidthSection,
  Row,
  Table,
} from '../../project-associate/project-associate-view/project-associate-view.tsx';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useCreateStudentOnSchoolYear } from './hooks/use-create-student-on-school-year.ts';
import { useProjectUser } from './hooks/use-project-user.ts';
import { useStudentOnActivities } from './hooks/use-student-on-activities.ts';
import { useUpdateStudentOnSchoolYear } from './hooks/use-update-student-on-school-year.ts';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ProfileHeader = styled.h2`
  margin-bottom: 10px;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const Value = styled.span`
  font-weight: normal;
`;

const UserView = () => {
  const navigate = useNavigate();
  const { userId, startYear } = useParams();
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear[0].id) ?? 0;
  const { data: projectUser, isLoading, isError } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);
  const { isLoading: isLoadingCreateStudentOnSchoolYear, createStudentOnSchoolYear } = useCreateStudentOnSchoolYear(
    projectUser?.id ?? 0,
    schoolYearId,
  );
  const studentOnSchoolYearId = (studentOnSchoolYear && studentOnSchoolYear[0]?.id?.toString()) ?? '0';
  const { updateStudentOnSchoolYear, isLoading: isLoadingUpdateStudentOnSchoolYear } = useUpdateStudentOnSchoolYear(
    studentOnSchoolYearId,
    studentOnSchoolYear && studentOnSchoolYear.length > 0 ? studentOnSchoolYear[0] : undefined,
  );
  const { data: studentOnActivities, isLoading: isLoadingStudentOnActivities } = useStudentOnActivities(
    studentOnSchoolYear ? studentOnSchoolYear[0]?.id : 0,
  );
  console.log(studentOnSchoolYear);

  const handleEnrollment = () => {
    if (studentOnSchoolYear?.length === 0) {
      createStudentOnSchoolYear();
    }
    const enrollment = studentOnSchoolYear?.[0];
    if (enrollment && enrollment.status === 'inactive') {
      enrollment.status = 'active';
      updateStudentOnSchoolYear();
    }
  };

  const handleUnenrollment = () => {
    const enrollment = studentOnSchoolYear?.[0];
    if (enrollment && enrollment.status === 'active') {
      enrollment.status = 'inactive';
      updateStudentOnSchoolYear();
    }
  };

  if (isError || !userId || typeof parseInt(userId) !== 'number') {
    navigate(`/${startYear}/users`);
  }

  if (
    isLoading ||
    isLoadingSchoolYear ||
    isLoadingCreateStudentOnSchoolYear ||
    isLoadingUpdateStudentOnSchoolYear ||
    isLoadingStudentOnActivities
  ) {
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  console.log('studentOnActivities', studentOnActivities);
  return (
    projectUser !== undefined && (
      <ProfileContainer>
        <ProfileHeader>
          {projectUser.childName} {projectUser.childSurname}
        </ProfileHeader>
        <ProfileSubmenu>
          {studentOnSchoolYear?.length === 0 ||
          (studentOnSchoolYear && studentOnSchoolYear[0].status === 'inactive') ? (
            <SecondaryButton onClick={handleEnrollment}>Upisi na skolsku godinu</SecondaryButton>
          ) : (
            <SecondaryButton onClick={handleUnenrollment}>Ispisi sa skolske godine</SecondaryButton>
          )}
          <SecondaryButton
            onClick={() =>
              navigate(`/${schoolYear ? schoolYear[0].startYear : 0}/user/${projectUser?.id}/activity/new`)
            }
            disabled={
              studentOnSchoolYear?.length === 0 ||
              (studentOnSchoolYear && studentOnSchoolYear[0]?.status === 'inactive')
            }
          >
            Upisi na aktivnost
          </SecondaryButton>
        </ProfileSubmenu>
        <Row>
          <Content>
            <ProfileItem>
              <Label>Guardian Name:</Label>
              <Value>{projectUser.guardianName}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>Guardian Surname:</Label>
              <Value>{projectUser.guardianSurname}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>Date of Birth:</Label>
              <Value>{projectUser.dateOfBirth}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>Address:</Label>
              <Value>{projectUser.address}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>City:</Label>
              <Value>{projectUser.city}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>School:</Label>
              <Value>{projectUser.school}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>Mobile Phone:</Label>
              <Value>{projectUser.mobilePhone}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>Email:</Label>
              <Value>{projectUser.email}</Value>
            </ProfileItem>
          </Content>
        </Row>
        <Row>
          <FullWidthSection>
            <h2>Aktivnosti</h2>
            {studentOnActivities !== undefined || studentOnActivities !== null ? (
              <Table>
                <thead>
                  <tr>
                    <th>Aktivnost</th>
                    <th>Klub</th>
                    <th>Status</th>
                    <th>Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {studentOnActivities &&
                    studentOnActivities.map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity?.activity?.activityName}</td>
                        <td>{activity?.activity?.projectAssociate?.clubName}</td>
                        <td>
                          <Status status={activity?.activityStatus} />
                        </td>
                        <td>
                          <SecondaryButton onClick={() => console.log('click!')}>Uredi</SecondaryButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            ) : (
              <tr>
                <td>Korisnik nema aktivnosti u ovoj skolskoj godini.</td>
              </tr>
            )}
          </FullWidthSection>
        </Row>
      </ProfileContainer>
    )
  );
};

export default UserView;
