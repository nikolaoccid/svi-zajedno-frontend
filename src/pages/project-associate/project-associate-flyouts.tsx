import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../components/flyout/flyout-component.tsx';
import { ManageActivity } from '../activity/manage-activity/manage-activity.tsx';
import ManageProjectAssociate from './manage-project-associate/manage-project-associate.tsx';
import ProjectAssociateView from './project-associate-view/project-associate-view.tsx';

export function ProjectAssociateFlyouts() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { projectAssociateId, startYear, activityId } = useParams();
  const navigate = useNavigate();

  const flyoutComponents = {
    manageActivityFlyout: {
      onHide: () => navigate(`/${startYear}/project-associates/${projectAssociateId}`),
      RenderComponent: ManageActivity,
      flyoutTitle: t('Manage activity'),
    },

    manageProjectAssociate: {
      onHide: () => navigate(`/${startYear}/project-associates/${projectAssociateId ?? ''}`),
      RenderComponent: ManageProjectAssociate,
      flyoutTitle: t('Edit associate'),
    },

    projectAssociateFlyout: {
      onHide: () => navigate(`/${startYear}/project-associates`),
      RenderComponent: ProjectAssociateView,
      flyoutTitle: t('Associate profile'),
    },
  };

  const [flyoutData, setFlyoutData] = useState<any>();
  useEffect(() => {
    const pathWithoutParams = pathname.split('?')[0];
    const paths = {
      [`/${startYear}/project-associates/${projectAssociateId}/activities/new`]: 'manageActivityFlyout',
      [`/${startYear}/project-associates/${projectAssociateId}/activities/${activityId}/edit`]: 'manageActivityFlyout',

      [`/${startYear}/project-associates/new`]: 'manageProjectAssociate',
      [`/${startYear}/project-associates/${projectAssociateId}/edit`]: 'manageProjectAssociate',
      [`/${startYear}/project-associates/${projectAssociateId}`]: 'projectAssociateFlyout',
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
      />
    )
  );
}
