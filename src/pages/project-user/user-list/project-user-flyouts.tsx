import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../../components/flyout/flyout-component.tsx';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import { EnrollStudentOnSchoolYear } from '../enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { ManageStudentOnActivityContainer } from '../manage-student-on-activity/manage-student-on-activity-container.tsx';
import { ActivityView } from '../user-view/activity-view.tsx';
import { AddEditRequestView } from '../user-view/add-edit-request-view.tsx';
import { EditUserOnActivity } from '../user-view/edit-user-on-activity.tsx';
import UserView from '../user-view/user-view.tsx';
interface FlyoutData {
  onHide: () => void;
  RenderComponent: any;
  flyoutTitle: string;
  flyoutWidth?: string;
}
export function ProjectUserFlyouts() {
  const { t } = useTranslation();
  const { startYear, userId, activityId, requestId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const flyoutComponents = {
    manageProjectUser: {
      onHide: () => navigate(`/${startYear}/users/${userId ?? ''}`),
      RenderComponent: ManageProjectUserView,
      flyoutTitle: t('User profile'),
    },
    userView: {
      onHide: () => navigate(`/${startYear}/users`),
      RenderComponent: UserView,
      flyoutTitle: t('User profile'),
      flyoutWidth: '65vw',
    },
    manageStudentOnActivity: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: ManageStudentOnActivityContainer,
      flyoutTitle: t('Enroll user on activity'),
      flyoutWidth: '50vw',
    },
    enrollStudentOnSchoolYear: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: EnrollStudentOnSchoolYear,
      flyoutTitle: t('Enroll user on the academic year'),
    },
    editUser: {
      onHide: () => navigate(`/${startYear}/users/${userId}/activities/${activityId}`),
      RenderComponent: EditUserOnActivity,
      flyoutTitle: t('Edit user on activity'),
    },
    manageActivity: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: ActivityView,
      flyoutTitle: t('Manage activity'),
      flyoutWidth: '50vw',
    },
    editActivity: {
      onHide: () => navigate(`/${startYear}/users/${userId}/activities/${activityId}`),
      RenderComponent: AddEditRequestView,
      flyoutTitle: t('Edit request'),
    },
  };

  const [flyoutData, setFlyoutData] = useState<FlyoutData | null>(null);

  useEffect(() => {
    const pathWithoutParams = pathname.split('?')[0];
    const paths = {
      [`/${startYear}/users/new`]: 'manageProjectUser',
      [`/${startYear}/users/${userId}/edit`]: 'manageProjectUser',
      [`/${startYear}/users/${userId}/activities/new`]: 'manageStudentOnActivity',
      [`/${startYear}/users/${userId}/enroll`]: 'enrollStudentOnSchoolYear',
      [`/${startYear}/users/${userId}`]: 'userView',
      [`/${startYear}/users/${userId}/activities/${activityId}/edit`]: 'editUser',
      [`/${startYear}/users/${userId}/activities/${activityId}`]: 'manageActivity',
      [`/${startYear}/users/${userId}/activities/${activityId}/request/${requestId}/edit`]: 'editActivity',
      [`/${startYear}/users/${userId}/activities/${activityId}/request/new`]: 'editActivity',
    };

    const flyoutName = paths[pathWithoutParams];
    if (flyoutName) {
      setFlyoutData(flyoutComponents[flyoutName]);
    } else {
      setFlyoutData(null);
    }
  }, [pathname]);

  return (
    flyoutData && (
      <FlyoutComponent
        flyoutTitle={flyoutData.flyoutTitle}
        onHide={flyoutData.onHide}
        RenderComponent={flyoutData.RenderComponent}
        flyoutWidth={flyoutData.flyoutWidth}
      />
    )
  );
}
