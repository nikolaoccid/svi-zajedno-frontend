import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../../components/flyout/flyout-component.tsx';
import { DashboardContainer } from '../../dashboard/dashboard.tsx';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import { EnrollStudentOnSchoolYear } from '../enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { ManageStudentOnActivityContainer } from '../manage-student-on-activity/manage-student-on-activity-container.tsx';
import { EditUserOnActivity } from '../user-view/edit-user-on-activity.tsx';
import UserView from '../user-view/user-view.tsx';
import { useGetProjectUserByPageAndQuery, useGetProjectUsersBySchoolYear } from './useGetProjectUserByPageAndQuery.ts';
import { UserList } from './user-list.tsx';

export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 24px;
`;
export const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;

export function UserListContainer() {
  const { t } = useTranslation();
  const { startYear, userId, activityId } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showAddEditFlyout, setShowAddEditFlyout] = useState(false);
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const [showAddActivityFlyout, setShowAddActivityFlyout] = useState(false);
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi korisnika');
  const [showEnrollOnSchoolYear, setShowEnrollOnSchoolYear] = useState(false);
  const [showUnenrollFlyout, setShowUnenrollFlyout] = useState(false);

  useEffect(() => {
    const pathWithoutParams = pathname.split('?')[0];
    const isNewUserPath = pathWithoutParams === `/${startYear}/users/new`;
    const isEditUserPath = pathWithoutParams === `/${startYear}/users/${userId}/edit`;
    const isUserActivitiesNewPath = pathWithoutParams === `/${startYear}/users/${userId}/activities/new`;
    const isUserPath = pathWithoutParams === `/${startYear}/users/${userId}`;
    const enrollUserOnSchoolYear = pathWithoutParams === `/${startYear}/users/${userId}/enroll`;
    const unenrollPath = pathWithoutParams === `/${startYear}/users/${userId}/activities/${activityId}/edit`;

    if (unenrollPath) {
      setFlyoutTitle(t('Exclude user from activity'));
      setShowUnenrollFlyout(true);
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
    } else if (isEditUserPath) {
      setFlyoutTitle(t('Edit user'));
      setShowAddEditFlyout(true);
      setShowUserFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
      setShowUnenrollFlyout(false);
    } else if (isUserActivitiesNewPath) {
      setFlyoutTitle(t('Enroll user on activity'));
      setShowAddActivityFlyout(true);
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowEnrollOnSchoolYear(false);
      setShowUnenrollFlyout(false);
    } else if (isNewUserPath) {
      setFlyoutTitle(t('Add new user'));
      setShowAddEditFlyout(true);
      setShowUserFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
      setShowUnenrollFlyout(false);
    } else if (enrollUserOnSchoolYear) {
      setFlyoutTitle(t('Enroll user on the academic year'));
      setShowEnrollOnSchoolYear(true);
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowUnenrollFlyout(false);
    } else if (isUserPath) {
      setFlyoutTitle(t('User profile'));
      setShowUserFlyout(true);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
      setShowUnenrollFlyout(false);
    } else {
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
      setShowUnenrollFlyout(false);
    }
  }, [pathname]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userType, setUserType] = useState('all');

  const { data: apiUsers, refetch: refetchByPageAndQuery } = useGetProjectUserByPageAndQuery(
    currentPage,
    searchQuery,
    schoolYear?.id,
  );
  const { data: apiUsersAll, refetch } = useGetProjectUsersBySchoolYear(
    schoolYear?.id.toString() ?? '0',
    currentPage,
    searchQuery,
    'active',
    'dateOfEnrollment',
  );

  useAsync(async () => {
    if (userType === 'all') {
      await refetchByPageAndQuery();
    } else {
      await refetch();
    }
  }, [userType, searchQuery, currentPage, schoolYear]);

  const onSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <UserList
        users={userType === 'all' ? apiUsers : (apiUsersAll as any)}
        setUserType={setUserType}
        setSearchQuery={onSearch}
        searchQuery={searchQuery}
        setCurrentPage={setCurrentPage}
      />

      <FlyoutComponent
        shouldShow={showAddEditFlyout}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(`/${startYear}/users`)}
        RenderComponent={ManageProjectUserView}
      />

      <FlyoutComponent
        shouldShow={showUserFlyout}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(`/${startYear}/users`)}
        RenderComponent={UserView}
        flyoutWidth={'800px'}
      />

      <FlyoutComponent
        shouldShow={showAddActivityFlyout}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(`/${startYear}/users/${userId}`)}
        RenderComponent={ManageStudentOnActivityContainer}
      />

      <FlyoutComponent
        shouldShow={showEnrollOnSchoolYear}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(`/${startYear}/users/${userId}`)}
        RenderComponent={EnrollStudentOnSchoolYear}
      />

      <FlyoutComponent
        shouldShow={showUnenrollFlyout}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(`/${startYear}/users/${userId}`)}
        RenderComponent={EditUserOnActivity}
      />
    </DashboardContainer>
  );
}
