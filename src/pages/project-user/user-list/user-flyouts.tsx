import styled from '@emotion/styled';
import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import { EnrollStudentOnSchoolYear } from '../enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { ManageStudentOnActivityContainer } from '../manage-student-on-activity/manage-student-on-activity-container.tsx';
import UserView from '../user-view/user-view.tsx';
import { HeaderSubtext, HeaderText } from './user-list-container.tsx';

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export function UserFlyouts() {
  const { startYear, userId } = useParams();
  const { data: schoolYear } = useSchoolYear(startYear ? parseInt(startYear ?? '0') : 0);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [showAddEditFlyout, setShowAddEditFlyout] = useState(false);
  const [showUserFlyout, setShowUserFlyout] = useState(false);
  const [showAddActivityFlyout, setShowAddActivityFlyout] = useState(false);
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi korisnika');
  const [showEnrollOnSchoolYear, setShowEnrollOnSchoolYear] = useState(false);

  useEffect(() => {
    const isNewUserPath = pathname.includes(`/${startYear}/users/new`);
    const isEditUserPath = pathname.includes(`/${startYear}/users/${userId}/edit`);
    const isUserActivitiesNewPath = pathname.includes(`/${startYear}/users/${userId}/activities/new`);
    const isUserPath = pathname.includes(`/${startYear}/users/${userId}`);
    const enrollUserOnSchoolYear = pathname.includes(`/${startYear}/users/${userId}/enroll`);

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
  }, [pathname]);
  return (
    <>
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
        <ManageStudentOnActivityContainer />
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
    </>
  );
}
