import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { CenterContent, PageContainer, ProfileSubmenu, SecondaryButton } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { useProjectUser } from './hooks/use-project-user.ts';

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

  const handleEnrollment = () => {
    console.log('handleEnrollment');
    console.log(studentOnSchoolYear);
  };
  const handleUnenrollment = () => {
    console.log('handleUnenrollment');
    console.log(studentOnSchoolYear);
  };
  if (isError || !userId || typeof parseInt(userId) !== 'number') {
    navigate(`/${startYear}/users`);
  }

  if (isLoading || isLoadingSchoolYear) {
    return (
      <PageContainer>
        <CenterContent>
          <PuffLoader color="#2196f3" />
        </CenterContent>
      </PageContainer>
    );
  }
  return (
    projectUser !== undefined && (
      <ProfileContainer>
        <ProfileHeader>
          {projectUser.childName} {projectUser.childSurname}
        </ProfileHeader>
        <ProfileSubmenu>
          {studentOnSchoolYear?.length === 0 ? (
            <SecondaryButton onClick={handleEnrollment}>Upisi na skolsku godinu</SecondaryButton>
          ) : (
            <SecondaryButton onClick={handleUnenrollment}>Ispisi sa skolske godine</SecondaryButton>
          )}
          <SecondaryButton onClick={() => console.log('button clicked')}>Upisi na aktivnost</SecondaryButton>
        </ProfileSubmenu>
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
      </ProfileContainer>
    )
  );
};

export default UserView;
