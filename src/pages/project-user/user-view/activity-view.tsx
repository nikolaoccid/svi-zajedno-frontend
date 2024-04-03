import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

import { Status } from '../../../components/status/status.tsx';
import { croatianDateFormat } from '../../../utils/croatian-date-format.ts';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { useStudentOnSchoolYear } from '../../student-on-school-year/hooks/get-student-on-school-year.ts';
import { AddNewButton } from '../user-list/add-new-button.tsx';
import { HeaderText } from '../user-list/user-list-container.tsx';
import { useUserAndActivityRequests } from './hooks/use-get-user-requests.ts';
import { useProjectUser } from './hooks/use-project-user.ts';
import { useStudentOnActivities } from './hooks/use-student-on-activities.ts';
import { HeaderData, Icon, Table, TableContainer, TableData, TableRow } from './user-activity-table.tsx';
import {
  CenterContainer,
  HeaderContainer,
  HeaderWithShadow,
  Label,
  ProfileContainer,
  ProfileItem,
  RightContainer,
  Row,
  Section,
  Value,
} from './user-view.tsx';

const ActivitySection = styled(Section)`
  height: auto;
`;
export function ActivityView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId, activityId } = useParams();
  const { data: schoolYear } = useSelectedSchoolYear();
  const { data: projectUser } = useProjectUser(userId);
  const { data: studentOnSchoolYear } = useStudentOnSchoolYear(schoolYear?.id, projectUser?.id);
  const { data: studentOnActivities } = useStudentOnActivities((studentOnSchoolYear as any)?.id ?? 0);
  const { activityRequests } = useUserAndActivityRequests((studentOnSchoolYear as any)?.id ?? 0);
  const studentOnActivity = studentOnActivities?.find((soa) => soa.id === parseInt(activityId ?? '0'));

  const editRequest = (requestId) =>
    navigate(`/${schoolYear?.startYear}/users/${projectUser?.id}/activities/${activityId}/request/${requestId}/edit`);
  return (
    projectUser !== undefined && (
      <ProfileContainer>
        <Row>
          <HeaderContainer>
            <h2>
              {projectUser.childName} {projectUser.childSurname} - {studentOnActivity?.activity?.activityName}
            </h2>
            <Status status={(studentOnActivity && (studentOnActivity as any).activityStatus) ?? 'inactive'}></Status>
          </HeaderContainer>
          <MdEdit
            size={18}
            color={'#00193f'}
            onClick={() => {
              navigate(
                `/${
                  schoolYear ? schoolYear.startYear : 0
                }/users/${projectUser?.id}/activities/${studentOnActivity?.id}/edit`,
              );
            }}
            style={{ marginRight: '25px' }}
          />
        </Row>

        <Row>
          <ActivitySection current={true}>
            <ProfileItem>
              <Label>{t('Associate')}</Label>
              <Value>
                {studentOnActivity?.activity?.projectAssociate?.clubName} - {studentOnActivity?.activity?.activityName}
              </Value>
            </ProfileItem>

            <ProfileItem>
              <Label>{t('User')}</Label>
              <Value>
                {projectUser.childName} {projectUser.childSurname}
              </Value>
            </ProfileItem>
            <ProfileItem>
              <Label>{t('Actual activity price (EUR)')}</Label>
              <Value>
                {studentOnActivity?.actualActivityCost ? studentOnActivity?.actualActivityCost + 'EUR' : t('Free')}
              </Value>
            </ProfileItem>
            <ProfileItem>
              <Label>{t('Full activity price')}</Label>
              <Value>
                {studentOnActivity?.activity?.activityPrice
                  ? studentOnActivity?.activity?.activityPrice + 'EUR'
                  : t('Free')}
              </Value>
            </ProfileItem>
            <ProfileItem>
              <Label>{t('Enrollment date')}</Label>
              <Value>{croatianDateFormat(studentOnActivity?.enrollmentDate, true)}</Value>
            </ProfileItem>
            <ProfileItem>
              <Label>{t('Withdrawal date')}</Label>
              <Value>{croatianDateFormat(studentOnActivity?.unenrollmentDate, true)}</Value>
            </ProfileItem>
          </ActivitySection>
        </Row>

        <HeaderWithShadow>
          <HeaderContainer>
            <CenterContainer>
              <HeaderText>{t('Requests')}</HeaderText>
            </CenterContainer>

            <RightContainer>
              <AddNewButton
                text={t('Add')}
                onClick={() =>
                  navigate(`/${schoolYear?.startYear}/users/${projectUser?.id}/activities/${activityId}/request/new`)
                }
                disabled={(studentOnActivity as any)?.activityStatus === 'inactive'}
              />
            </RightContainer>
          </HeaderContainer>
        </HeaderWithShadow>
        {activityRequests.filter((request) => request.studentOnActivityId === parseInt(activityId ?? '0')).length >
          0 && (
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <td />
                  <HeaderData>{t('Title')}</HeaderData>
                  <HeaderData>{t('Store Info')}</HeaderData>
                  <HeaderData>{t('Description')}</HeaderData>
                  <HeaderData>{t('Quantity')}</HeaderData>
                  <HeaderData>{t('Cost Per Unit')}</HeaderData>
                </TableRow>
              </thead>
              <tbody>
                {activityRequests
                  .filter((request) => request.studentOnActivityId === parseInt(activityId ?? '0'))
                  .map((request) => (
                    <TableRow key={request.id} onClick={() => editRequest(request.id)}>
                      <Icon onClick={() => console.log(request)}>
                        <GoDotFill size={18} color={request.userRequestStatus === 'approved' ? 'green' : 'red'} />
                      </Icon>
                      <TableData onClick={() => editRequest(request.id)}>{request.userRequestTitle}</TableData>
                      <TableData onClick={() => editRequest(request.id)}>{request.userRequestStoreInfo}</TableData>
                      <TableData onClick={() => editRequest(request.id)}>{request.userRequestDescription}</TableData>
                      <TableData onClick={() => editRequest(request.id)}>{request.userRequestQuantity}</TableData>
                      <TableData onClick={() => editRequest(request.id)}>{request.userRequestCostPerUnit}</TableData>
                      <Icon>
                        <MdDelete
                          size={18}
                          color={'#00193f'}
                          onClick={() => console.log('delete click')}
                          style={{ margin: '10px' }}
                        />
                      </Icon>
                    </TableRow>
                  ))}
              </tbody>
            </Table>
          </TableContainer>
        )}
      </ProfileContainer>
    )
  );
}
