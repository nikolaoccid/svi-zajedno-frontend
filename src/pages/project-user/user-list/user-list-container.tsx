import styled from '@emotion/styled';
import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getProjectUserByPageAndQuery, getProjectUsersBySchoolYear } from '../../../api/api.ts';
import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import { EnrollStudentOnSchoolYear } from '../enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { ManageStudentOnActivity } from '../manage-student-on-activity/manage-student-on-activity.tsx';
import UserView from '../user-view/user-view.tsx';
import { UserList } from './user-list.tsx';

export const HeaderText = styled.span`
  font-family: Axiforma;
  font-weight: bold;
  font-size: 24px;
`;
const HeaderSubtext = styled.span`
  font-style: normal;
  font-size: 12px;
  color: #606060;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export function UserListContainer() {
  const { startYear, userId } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();

  const [userType, setUserType] = useState('all');
  const [showAddEditFlyout, setShowAddEditFlyout] = useState(false);
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const [showAddActivityFlyout, setShowAddActivityFlyout] = useState(false);
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi korisnika');
  const [showEnrollOnSchoolYear, setShowEnrollOnSchoolYear] = useState(false);

  const [users, setUsers] = useState({
    items: [],
    meta: { totalItems: 1, itemCount: 1, itemsPerPage: 1, totalPages: 1, currentPage: 1 },
  } as any);

  const setCurrentPage = (page: number) => {
    setUsers((prevState) => ({ ...prevState, meta: { ...prevState.meta, currentPage: page } }));
  };

  useAsync(async () => {
    let res;
    if (userType === 'all') {
      res = await getProjectUserByPageAndQuery(users.meta.currentPage, searchQuery);
    } else {
      res = await getProjectUsersBySchoolYear(
        schoolYear?.id.toString() ?? '0',
        users.meta.currentPage,
        searchQuery,
        'active',
      );
    }
    setUsers(res);
  }, [userType, searchQuery, users.meta.currentPage, schoolYear]);

  useEffect(() => {
    const isNewUserPath = pathname === `/${schoolYear?.startYear}/users/new`;
    const isEditUserPath = pathname === `/${schoolYear?.startYear}/users/${userId}/edit`;
    const isUserActivitiesNewPath = pathname === `/${schoolYear?.startYear}/users/${userId}/activities/new`;
    const isUserPath = pathname === `/${schoolYear?.startYear}/users/${userId}`;
    const enrollUserOnSchoolYear = pathname === `/${schoolYear?.startYear}/users/${userId}/enroll`;

    if (isEditUserPath) {
      setFlyoutTitle('Uredi korisnika');
      setShowAddEditFlyout(true);
      setShowUserFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
    } else if (isUserActivitiesNewPath) {
      setFlyoutTitle('Upisi korisnika na aktivnost');
      setShowAddActivityFlyout(true);
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowEnrollOnSchoolYear(false);
    } else if (isNewUserPath) {
      setFlyoutTitle('Dodaj novog korisnika');
      setShowAddEditFlyout(true);
      setShowUserFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
    } else if (isUserPath) {
      setFlyoutTitle('Pregled korisnika');
      setShowUserFlyout(true);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
    } else if (enrollUserOnSchoolYear) {
      setFlyoutTitle('Upisi korisnika na skolsku godinu');
      setShowEnrollOnSchoolYear(true);
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
    } else {
      setShowUserFlyout(false);
      setShowAddEditFlyout(false);
      setShowAddActivityFlyout(false);
      setShowEnrollOnSchoolYear(false);
    }
  }, [pathname, setShowAddEditFlyout, setShowUserFlyout, setFlyoutTitle, setShowAddActivityFlyout]);

  return (
    <div>
      <UserList
        users={users}
        setUserType={setUserType}
        setSearchQuery={setSearchQuery}
        setCurrentPage={setCurrentPage}
      />
      <Flyout
        animationDuration={100}
        show={showAddEditFlyout}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
        }}
      >
        <ManageProjectUserView />
      </Flyout>
      <Flyout
        animationDuration={100}
        show={showUserFlyout}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
        }}
        width="600px"
      >
        <UserView />
      </Flyout>
      <Flyout
        animationDuration={100}
        show={showAddActivityFlyout}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
        }}
      >
        <ManageStudentOnActivity />
      </Flyout>
      <Flyout
        animationDuration={100}
        show={showEnrollOnSchoolYear}
        header={
          <Column>
            <HeaderText>{flyoutTitle}</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
        }}
      >
        <EnrollStudentOnSchoolYear />
      </Flyout>
    </div>
  );
}
