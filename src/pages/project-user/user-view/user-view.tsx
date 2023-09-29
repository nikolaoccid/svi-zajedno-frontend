import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useAsync } from 'react-async-hook';
import { useNavigate, useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

import { api } from '../../../api';
import { Status } from '../../../components/status/status.tsx';
import { Submenu } from '../../../components/submenu/submenu.tsx';
import { toastError, toastSuccess } from '../../../utils/toast.ts';
import {
  Button,
  CenterContent,
  PageContainer,
  ProfileSubmenu,
  SecondaryButton,
} from '../../common-styles/common-styles.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import {
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
  //margin-bottom: 10px;
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
export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const TdWithGap = styled.td`
  display: flex;
  gap: 20px;
`;

const UserView = () => {
  const queryClient = useQueryClient();
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
  const { updateStudentOnSchoolYear, isLoading: isLoadingUpdateStudentOnSchoolYear } = useUpdateStudentOnSchoolYear();
  const { data: studentOnActivities } = useStudentOnActivities(
    studentOnSchoolYear?.length === 1 ? studentOnSchoolYear[0]?.id : undefined,
  );

  const handleEnrollment = async () => {
    if (studentOnSchoolYear?.length === 0) {
      await createStudentOnSchoolYear();
    }
    const enrollment = studentOnSchoolYear?.[0];
    if (enrollment && enrollment.status === 'inactive') {
      await updateStudentOnSchoolYear(enrollment.id.toString(), { ...enrollment, status: 'active' });
    }
  };

  const handleUnenrollment = async () => {
    const enrollment = studentOnSchoolYear?.[0];
    if (enrollment && enrollment.status === 'active') {
      await updateStudentOnSchoolYear(enrollment.id.toString(), { ...enrollment, status: 'inactive' });
    }
  };
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
  useAsync(async () => {
    await queryClient.invalidateQueries(['getStudentOnActivities']);
  }, []);

  if (isError || !userId || typeof parseInt(userId) !== 'number') {
    navigate(`/${startYear}/users`);
  }

  if (isLoading || isLoadingSchoolYear || isLoadingCreateStudentOnSchoolYear || isLoadingUpdateStudentOnSchoolYear) {
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
      <PageContainer>
        <CenterContent>
          <Submenu />
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
                {studentOnActivities !== undefined ? (
                  <Table>
                    <thead>
                      <tr>
                        <th>Aktivnost</th>
                        <th>Klub</th>
                        <th>Cijena</th>
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
                            <td>{activity?.activity?.activityPrice} EUR</td>
                            <td>
                              <Status status={activity?.activityStatus} />
                            </td>
                            <TdWithGap>
                              {activity.activityStatus === 'active' && (
                                <SecondaryButton
                                  onClick={() => disenrollActivity(activity)}
                                  disabled={studentOnSchoolYear ? studentOnSchoolYear[0]?.status === 'inactive' : false}
                                >
                                  Ispisi
                                </SecondaryButton>
                              )}
                              {activity.activityStatus === 'inactive' && (
                                <SecondaryButton
                                  onClick={() => enrollActivity(activity)}
                                  disabled={studentOnSchoolYear ? studentOnSchoolYear[0]?.status === 'inactive' : false}
                                >
                                  Upisi
                                </SecondaryButton>
                              )}
                              <Button
                                backgroundColor="#d9534f"
                                onClick={() => deleteActivityEnrollment(activity)}
                                disabled={studentOnSchoolYear ? studentOnSchoolYear[0]?.status === 'inactive' : false}
                              >
                                Izbrisi
                              </Button>
                            </TdWithGap>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : (
                  <div>Korisnik nema aktivnosti u ovoj skolskoj godini.</div>
                )}
              </FullWidthSection>
            </Row>
          </ProfileContainer>
        </CenterContent>
      </PageContainer>
    )
  );
};

export default UserView;
