import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';
import { MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { Status } from '../../../components/status/status.tsx';
import { croatianDateFormat } from '../../../utils/croatian-date-format.ts';
import { Button, CenterContent, PageContainer } from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { AddNewButton } from '../user-list/add-new-button.tsx';
import { HeaderText } from '../user-list/user-list-container.tsx';
import { useProjectUser } from './hooks/use-project-user.ts';
import { useStudentOnActivities } from './hooks/use-student-on-activities.ts';
import { useUpdateStudentOnSchoolYear } from './hooks/use-update-student-on-school-year.ts';
import { UserActivityTable } from './user-activity-table.tsx';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Axiforma;
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  font-family: Axiforma;
  font-size: 12px;
  font-weight: normal;
  padding: 5px 0;
`;
const Section = styled.div<{ current: boolean }>`
  display: ${(props) => (props.current ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  height: 30vh;
`;
const NavigationItem = styled.span<{ current: boolean }>`
  text-decoration: ${(props) => (props.current ? 'underline' : 'none')};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProfileHeader = styled.h2`
  //margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
  font-size: 14px;
`;

const Value = styled.span`
  font-weight: normal;
  font-size: 14px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
`;

export const TdWithGap = styled.td`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const HeaderWithShadow = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: white;
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.2);
`;
const CenterContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const RightContainer = styled.div`
  margin-left: auto;
  padding: 10px;
`;

const UserView = ({ onClose }: { onClose?: () => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { userId, startYear } = useParams();
  const { data: schoolYear, isLoading: isLoadingSchoolYear } = useSchoolYear(startYear ? parseInt(startYear) : 0);
  const schoolYearId = (schoolYear && schoolYear.id) ?? 0;
  const { data: projectUser, isLoading } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYearId, projectUser?.id);

  const { updateStudentOnSchoolYear, isLoading: isLoadingUpdateStudentOnSchoolYear } = useUpdateStudentOnSchoolYear();
  const { data: studentOnActivities } = useStudentOnActivities((studentOnSchoolYear as any)?.id);
  const [menuState, setMenuState] = useState('schoolyear');

  const handleEnrollment = () => {
    navigate(`/${schoolYear && schoolYear.startYear}/users/${projectUser?.id}/enroll`);
  };

  const handleUnenrollment = async () => {
    const enrollment = studentOnSchoolYear;
    if (enrollment && (enrollment as any).status === 'active') {
      await updateStudentOnSchoolYear((enrollment as any).id.toString(), {
        ...(enrollment as any),
        status: 'inactive',
      });
    }
  };

  useAsync(async () => {
    await queryClient.invalidateQueries(['getStudentOnActivities']);
  }, []);

  if (isLoading || isLoadingSchoolYear || isLoadingUpdateStudentOnSchoolYear) {
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
        <Row>
          <HeaderContainer>
            <ProfileHeader>
              {projectUser.childName} {projectUser.childSurname}
            </ProfileHeader>
            <Status status={(studentOnSchoolYear && (studentOnSchoolYear as any).status) ?? 'inactive'}></Status>
          </HeaderContainer>
          <MdEdit
            size={18}
            color={'#00193f'}
            onClick={() => {
              navigate(`/${schoolYear ? schoolYear.startYear : 0}/users/${projectUser?.id}/edit`);
              onClose?.();
            }}
            style={{ marginRight: '25px' }}
          />
        </Row>

        <Navigation>
          <NavigationItem onClick={() => setMenuState('schoolyear')} current={menuState === 'schoolyear'}>
            Podaci o skolskoj godini
          </NavigationItem>
          <NavigationItem onClick={() => setMenuState('child')} current={menuState === 'child'}>
            Podaci o djetetu
          </NavigationItem>
          <NavigationItem onClick={() => setMenuState('guardian')} current={menuState === 'guardian'}>
            Podaci o skrbniku
          </NavigationItem>
        </Navigation>

        <Section current={menuState === 'schoolyear'}>
          <ProfileItem>
            <Label>Osnova upisa</Label>
            <Value>
              {studentOnSchoolYear && (studentOnSchoolYear as any).status === 'active'
                ? ((studentOnSchoolYear as any).sourceSystem.toUpperCase() === 'OBITELJSKICENTAR'
                    ? 'Obiteljski centar'
                    : 'CZSS') +
                  ', ' +
                  (studentOnSchoolYear as any).protectionType
                : 'Nije upisan'}
            </Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Datum upisa na skolsku godinu:</Label>
            <Value>
              {studentOnSchoolYear && (studentOnSchoolYear as any).status === 'active'
                ? croatianDateFormat((studentOnSchoolYear as any).dateOfEnrollment)
                : 'Nije upisan'}
            </Value>
          </ProfileItem>
          <ButtonContainer>
            {(studentOnSchoolYear as any)?.length === 0 ||
            (studentOnSchoolYear && (studentOnSchoolYear as any).status === 'inactive') ? (
              <Button backgroundColor="#5cb85c" onClick={handleEnrollment}>
                Upisi na skolsku godinu
              </Button>
            ) : (
              <Button backgroundColor="#d9534f" onClick={handleUnenrollment}>
                Ispisi sa skolske godine
              </Button>
            )}
          </ButtonContainer>
        </Section>
        <Section current={menuState === 'child'}>
          <ProfileItem>
            <Label>Datum rodenja:</Label>
            <Value>{croatianDateFormat(projectUser.dateOfBirth)}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Spol:</Label>
            <Value>{projectUser.gender === 'male' ? 'Musko' : 'Zensko'}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>OIB:</Label>
            <Value>{projectUser.oib}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Adresa:</Label>
            <Value>
              {projectUser.address}, {projectUser.city}
            </Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Skola:</Label>
            <Value>{projectUser.school}</Value>
          </ProfileItem>
        </Section>
        <Section current={menuState === 'guardian'}>
          <ProfileItem>
            <Label>Skrbnik:</Label>
            <Value>
              {projectUser.guardianName} {projectUser.guardianSurname}
            </Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Mobitel:</Label>
            <Value>{projectUser.mobilePhone}</Value>
          </ProfileItem>
          <ProfileItem>
            <Label>Email:</Label>
            <Value>{projectUser.email}</Value>
          </ProfileItem>
        </Section>

        <HeaderWithShadow>
          <HeaderContainer>
            <CenterContainer>
              <HeaderText>Aktivnosti</HeaderText>
            </CenterContainer>

            <RightContainer>
              <AddNewButton
                text={'Dodaj'}
                onClick={() => navigate(`/${schoolYear?.startYear}/users/${projectUser?.id}/activities/new`)}
                disabled={(studentOnSchoolYear as any)?.status === 'inactive'}
              />
            </RightContainer>
          </HeaderContainer>
        </HeaderWithShadow>

        <UserActivityTable activities={studentOnActivities} />
      </ProfileContainer>
    )
  );
};

export default UserView;
