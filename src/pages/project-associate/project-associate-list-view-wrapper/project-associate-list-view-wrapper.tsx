import { DashboardContainer } from '../../dashboard/dashboard.tsx';
import { ProjectAssociateFlyouts } from '../project-associate-flyouts.tsx';
import { ProjectAssociateListView } from '../project-associate-list-view/project-associate-list-view.tsx';

export function ProjectAssociateListViewWrapper() {
  return (
    <DashboardContainer>
      <ProjectAssociateListView />
      <ProjectAssociateFlyouts />
    </DashboardContainer>
  );
}
