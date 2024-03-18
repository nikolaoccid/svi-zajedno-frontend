import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { DashboardContainer } from '../dashboard/dashboard.tsx';
import { Column } from '../dashboard-page/dashboard-page.tsx';
import { useSelectedSchoolYear } from '../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderSubtext, HeaderText } from '../project-user/user-list/user-list-container.tsx';
import { CreateSchoolYear } from './create-school-year/create-school-year.tsx';
import { SchoolYearsPage } from './school-years-page.tsx';

export function SchoolYearsContainer() {
  const { pathname } = useLocation();
  const { startYear } = useParams();
  const navigate = useNavigate();
  const { data: schoolYear } = useSelectedSchoolYear();
  const [newSchoolYearFlyout, setNewSchoolYearFlyout] = useState(false);

  useEffect(() => {
    const pathWithoutParams = pathname.split('?')[0];
    const newSchoolYearPath = pathWithoutParams === `/${startYear}/school-years/new`;

    if (newSchoolYearPath) {
      setNewSchoolYearFlyout(true);
    } else {
      setNewSchoolYearFlyout(false);
    }
  }, [pathname]);
  return (
    <DashboardContainer>
      <SchoolYearsPage />
      <Flyout
        animationDuration={100}
        show={newSchoolYearFlyout}
        header={
          <Column>
            <HeaderText>Dodaj novu skolsku godinu</HeaderText>
            <HeaderSubtext>
              Skolska godina: {schoolYear?.startYear} / {schoolYear?.endYear}
            </HeaderSubtext>
          </Column>
        }
        onHide={() => {
          navigate(-1);
        }}
      >
        <CreateSchoolYear />
      </Flyout>
    </DashboardContainer>
  );
}
