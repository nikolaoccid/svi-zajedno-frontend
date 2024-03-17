import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ManageActivity } from '../../activity/manage-activity/manage-activity.tsx';
import { DashboardContainer } from '../../dashboard/dashboard.tsx';
import { Column } from '../../dashboard-page/dashboard-page.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderSubtext, HeaderText } from '../../project-user/user-list/user-list-container.tsx';
import ManageProjectAssociate from '../manage-project-associate/manage-project-associate.tsx';
import { ProjectAssociateListView } from '../project-associate-list-view/project-associate-list-view.tsx';
import ProjectAssociateView from '../project-associate-view/project-associate-view.tsx';

export function ProjectAssociateListViewWrapper() {
  const { pathname } = useLocation();
  const { projectAssociateId, startYear, activityId } = useParams();
  const { data: schoolYear } = useSelectedSchoolYear();
  const navigate = useNavigate();
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi suradnika');
  const [showProjectAssociateFlyout, setShowProjectAssociateFlyout] = useState(false);
  const [showManageProjectAssociateActivityFlyout, setShowManageProjectAssociateActivityFlyout] = useState(false);
  const [showManageProjectAssociateFlyout, setShowManageProjectAssociateFlyout] = useState(false);

  useEffect(() => {
    const manageActivityFlyout =
      pathname.includes(`/${startYear}/project-associates/${projectAssociateId}/activities/new`) ||
      pathname.includes(`/${startYear}/project-associates/${projectAssociateId}/activities/${activityId}/edit`);
    const manageProjectAssociate =
      pathname.includes(`/${startYear}/project-associates/new`) ||
      pathname.includes(`/${startYear}/project-associates/${projectAssociateId}/edit`);
    const projectAssociateFlyout = pathname.includes(`/${startYear}/project-associates/${projectAssociateId}`);

    // console.log(
    //   'manageActivityFlyout',
    //   manageActivityFlyout,
    //   'manageProjectAssociate',
    //   manageProjectAssociate,
    //   'projectAssociateFlyout',
    //   projectAssociateFlyout,
    // );

    if (manageActivityFlyout) {
      setFlyoutTitle('Uredi aktivnost');
      setShowManageProjectAssociateActivityFlyout(true);
      setShowProjectAssociateFlyout(false);
      setShowManageProjectAssociateFlyout(false);
    } else if (manageProjectAssociate) {
      setFlyoutTitle('Uredi suradnika');
      setShowProjectAssociateFlyout(false);
      setShowManageProjectAssociateActivityFlyout(false);
      setShowManageProjectAssociateFlyout(true);
    } else if (projectAssociateFlyout) {
      setFlyoutTitle('Uredi suradnika');
      setShowProjectAssociateFlyout(true);
      setShowManageProjectAssociateActivityFlyout(false);
      setShowManageProjectAssociateFlyout(false);
    } else {
      setShowManageProjectAssociateActivityFlyout(false);
      setShowProjectAssociateFlyout(false);
      setShowManageProjectAssociateFlyout(false);
    }
  }, [pathname]);
  return (
    <DashboardContainer>
      <ProjectAssociateListView />

      <Flyout
        animationDuration={100}
        show={showProjectAssociateFlyout}
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
        width="800px"
      >
        <ProjectAssociateView />
      </Flyout>

      <Flyout
        animationDuration={100}
        show={showManageProjectAssociateActivityFlyout}
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
        <ManageActivity />
      </Flyout>

      <Flyout
        animationDuration={100}
        show={showManageProjectAssociateFlyout}
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
        <ManageProjectAssociate />
      </Flyout>
    </DashboardContainer>
  );
}
