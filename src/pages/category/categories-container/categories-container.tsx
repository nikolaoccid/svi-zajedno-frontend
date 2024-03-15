import { Flyout } from 'pivotal-ui/react/flyout';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Column } from '../../dashboard-page/dashboard-page.tsx';
import { useSelectedSchoolYear } from '../../dashboard-page/hooks/use-fetch-school-year.ts';
import { HeaderSubtext, HeaderText } from '../../project-user/user-list/user-list-container.tsx';
import { CategoriesPage } from '../categories-page/categories-page.tsx';
import ManageCategory from '../manage-category/manage-category.tsx';

export function CategoriesContainer() {
  const { startYear, categoryId } = useParams();
  const navigate = useNavigate();
  const { data: schoolYear } = useSelectedSchoolYear();
  const [showManageCategoryFlyout, setShowManageCategoryFlyout] = useState(false);
  const { pathname } = useLocation();
  const [flyoutTitle, setFlyoutTitle] = useState('Uredi kategoriju');
  useEffect(() => {
    const isNewCategoryPath = pathname.includes(`${startYear}/categories/new`);
    const isEditCategoryPath = pathname.includes(`${startYear}/categories/${categoryId}/edit`);

    console.log('isNewCategoryPath', isNewCategoryPath, 'isEditCategoryPath', isEditCategoryPath);

    if (isEditCategoryPath) {
      setFlyoutTitle('Uredi kategoriju');
      setShowManageCategoryFlyout(true);
    } else if (isNewCategoryPath) {
      setFlyoutTitle('Dodaj kategoriju');
      setShowManageCategoryFlyout(true);
    } else {
      setShowManageCategoryFlyout(false);
    }
  }, [pathname]);

  return (
    <div>
      <CategoriesPage />
      <Flyout
        animationDuration={100}
        show={showManageCategoryFlyout}
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
        <ManageCategory />
      </Flyout>
    </div>
  );
}
