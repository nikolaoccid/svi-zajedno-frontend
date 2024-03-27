import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../../components/flyout/flyout-component.tsx';
import ManageProjectUserView from '../create-project-user/manage-project-user-view.tsx';
import { EnrollStudentOnSchoolYear } from '../enroll-student-on-school-year/enroll-student-on-school-year.tsx';
import { ManageStudentOnActivityContainer } from '../manage-student-on-activity/manage-student-on-activity-container.tsx';
import { EditUserOnActivity } from '../user-view/edit-user-on-activity.tsx';
import UserView from '../user-view/user-view.tsx';
interface FlyoutData {
  onHide: () => void;
  RenderComponent: any;
  flyoutTitle: string;
}
export function ProjectUserFlyouts() {
  const { t } = useTranslation();
  const { startYear, userId, activityId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const flyoutComponents = {
    manageProjectUser: {
      onHide: () => navigate(`/${startYear}/users`),
      RenderComponent: ManageProjectUserView,
      flyoutTitle: t('User profile'),
    },
    userView: {
      onHide: () => navigate(`/${startYear}/users`),
      RenderComponent: UserView,
      flyoutTitle: t('User profile'),
    },
    manageStudentOnActivity: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: ManageStudentOnActivityContainer,
      flyoutTitle: t('Enroll user on activity'),
    },
    enrollStudentOnSchoolYear: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: EnrollStudentOnSchoolYear,
      flyoutTitle: t('Enroll user on the academic year'),
    },
    editUser: {
      onHide: () => navigate(`/${startYear}/users/${userId}`),
      RenderComponent: EditUserOnActivity,
      flyoutTitle: t('Edit user'),
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
      [`/${startYear}/users/${userId}/activities/${activityId}/edit`]: 'manageStudentOnActivity',
    };

    const flyoutName = paths[pathWithoutParams];
    if (flyoutName) {
      setFlyoutData(flyoutComponents[flyoutName]);
    } else {
      setFlyoutData(null);
    }
  }, [pathname, startYear, userId, activityId, flyoutComponents]);

  return (
    flyoutData && (
      <FlyoutComponent
        flyoutTitle={flyoutData.flyoutTitle}
        onHide={flyoutData.onHide}
        RenderComponent={flyoutData.RenderComponent}
      />
    )
  );
}
