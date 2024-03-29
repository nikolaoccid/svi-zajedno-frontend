import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { FlyoutComponent } from '../../../components/flyout/flyout-component.tsx';
import { DashboardContainer } from '../../dashboard/dashboard.tsx';
import { CategoriesPage } from '../categories-page/categories-page.tsx';
import ManageCategory from '../manage-category/manage-category.tsx';

export function CategoriesContainer() {
  const { t } = useTranslation();
  const { startYear, categoryId } = useParams();
  const navigate = useNavigate();
  const [showManageCategoryFlyout, setShowManageCategoryFlyout] = useState(false);
  const { pathname } = useLocation();
  const [flyoutTitle, setFlyoutTitle] = useState(t('Edit category'));
  useEffect(() => {
    const isNewCategoryPath = pathname.includes(`${startYear}/categories/new`);
    const isEditCategoryPath = pathname.includes(`${startYear}/categories/${categoryId}/edit`);

    if (isEditCategoryPath) {
      setFlyoutTitle(t('Edit category'));
      setShowManageCategoryFlyout(true);
    } else if (isNewCategoryPath) {
      setFlyoutTitle(t('Add category'));
      setShowManageCategoryFlyout(true);
    } else {
      setShowManageCategoryFlyout(false);
    }
  }, [pathname]);

  return (
    <DashboardContainer>
      <CategoriesPage />
      <FlyoutComponent
        showFlyout={showManageCategoryFlyout}
        flyoutTitle={flyoutTitle}
        onHide={() => navigate(-1)}
        RenderComponent={ManageCategory}
      />
    </DashboardContainer>
  );
}
