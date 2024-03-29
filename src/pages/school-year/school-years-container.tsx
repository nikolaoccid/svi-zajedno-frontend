import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../components/flyout/flyout-component.tsx';
import { DashboardContainer } from '../dashboard/dashboard.tsx';
import { CreateSchoolYear } from './create-school-year/create-school-year.tsx';
import { SchoolYearsPage } from './school-years-page.tsx';

export function SchoolYearsContainer() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { startYear } = useParams();
  const navigate = useNavigate();
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
      <FlyoutComponent
        flyoutTitle={t('Add new academic year')}
        onHide={() => navigate(-1)}
        RenderComponent={() => <CreateSchoolYear hideHero={true} />}
        showFlyout={newSchoolYearFlyout}
      />
    </DashboardContainer>
  );
}
